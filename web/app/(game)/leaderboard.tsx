import React from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { apiService, LeaderboardEntry } from '@/services/api';

export default function LeaderboardScreen() {
  const [scores, setScores] = React.useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();

  const fetchLeaderboard = async () => {
    try {
      const data = await apiService.getLeaderboard();
      setScores(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  React.useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderItem = ({ item }: { item: LeaderboardEntry }) => (
    <View style={styles.row}>
      <ThemedText style={styles.rankText}>#{item.rank}</ThemedText>
      <View style={styles.playerInfo}>
        <ThemedText style={styles.playerName}>{item.playerName}</ThemedText>
        <Image
          source={{ uri: `https://flagcdn.com/w40/${item.countryCode.toLowerCase()}.png` }}
          style={styles.flag}
          resizeMode="cover"
        />
      </View>
      <ThemedText style={styles.scoreText}>{item.score}</ThemedText>
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Lider Tablosu</ThemedText>
        <ThemedButton
          title="Yeni Oyun"
          onPress={() => router.push('/')}
          variant="secondary"
        />
      </View>

      <View style={styles.listHeader}>
        <ThemedText style={styles.headerText}>Sıra</ThemedText>
        <ThemedText style={[styles.headerText, styles.playerHeaderText]}>Oyuncu</ThemedText>
        <ThemedText style={styles.headerText}>Skor</ThemedText>
      </View>

      <FlatList
        data={scores}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      },
      default: {
        elevation: 2,
        shadowColor: 'transparent',
        shadowOffset: undefined,
        shadowOpacity: undefined,
        shadowRadius: undefined,
      }
    })
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  playerHeaderText: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rankText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerName: {
    flex: 1,
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 4,
  },
  scoreText: {
    flex: 1,
    textAlign: 'center',
  },
}); 