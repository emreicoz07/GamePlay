import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, TextInput, Alert, Platform } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { ThemedButton } from '../ThemedButton';
import { apiService } from '@/services/api';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface GameOverModalProps {
  visible: boolean;
  score: number;
  onRestart: () => void;
  onClose: () => void;
  defaultPlayerName: string;
  countryCode: string;
}

export function GameOverModal({ 
  visible, 
  score, 
  onRestart, 
  onClose,
  defaultPlayerName,
  countryCode 
}: GameOverModalProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [playerName, setPlayerName] = useState(defaultPlayerName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPlayerName(defaultPlayerName);
  }, [defaultPlayerName]);

  const handleSubmitScore = async () => {
    if (!playerName.trim()) {
      Alert.alert('Hata', 'Lütfen isminizi girin');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.submitScore({
        playerName: playerName.trim(),
        score,
        countryCode
      });
      
      onClose();
      router.replace('/leaderboard');
      
    } catch (error) {
      console.error('Score submission error:', error);
      Alert.alert('Hata', 'Skor kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ThemedView style={styles.centeredView}>
        <ThemedView style={[styles.modalView, { backgroundColor: colors.background }]}>
          <ThemedText style={styles.modalTitle}>Oyun Bitti!</ThemedText>
          <ThemedText style={styles.scoreText}>Skorunuz: {score}</ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="İsminizi girin"
            value={playerName}
            onChangeText={setPlayerName}
            maxLength={50}
            editable={false}
          />

          <View style={styles.buttonContainer}>
            <ThemedButton
              title="Skoru Kaydet"
              onPress={handleSubmitScore}
              disabled={isSubmitting}
            />
            <ThemedButton
              title="Yeniden Başla"
              onPress={onRestart}
              variant="secondary"
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }
    })
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
}); 