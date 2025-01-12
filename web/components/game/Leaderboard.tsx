import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { apiService, LeaderboardEntry } from '@/services/api';

export function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={scores}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <ThemedText style={styles.headerText}>Sıra</ThemedText>
            <ThemedText style={[styles.headerText, styles.nameText]}>İsim</ThemedText>
            <ThemedText style={styles.headerText}>Skor</ThemedText>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <ThemedText style={styles.rankText}>{item.rank}</ThemedText>
            <ThemedText style={[styles.text, styles.nameText]}>{item.playerName}</ThemedText>
            <ThemedText style={styles.text}>{item.score}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rankText: {
    width: 50,
    textAlign: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  nameText: {
    flex: 2,
    textAlign: 'left',
  },
}); 