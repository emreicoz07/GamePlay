import { useState } from 'react';
import { StyleSheet, Modal, FlatList, TouchableOpacity, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { CountryFlag } from './CountryFlag';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'TR', name: 'Turkey' },
  // Add more countries...
];

type CountryPickerProps = {
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
};

export function CountryPicker({ selectedCountry, onSelectCountry }: CountryPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.pickerButton}
      >
        <ThemedView style={styles.selectedCountryContainer}>
          {selectedCountryData && (
            <CountryFlag countryCode={selectedCountry} size={24} />
          )}
          <ThemedText style={styles.buttonText}>
            {selectedCountryData ? selectedCountryData.name : "Select Country"}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              Select Country
            </ThemedText>

            <FlatList
              data={COUNTRIES}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectCountry(item.code);
                    setModalVisible(false);
                  }}
                  style={styles.countryItem}
                >
                  <CountryFlag countryCode={item.code} size={24} />
                  <ThemedText style={styles.countryName}>
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              )}
              style={styles.countryList}
            />

            <Button 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              Close
            </Button>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2D3748',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
  },
  selectedCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    height: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalContent: {
    width: Platform.OS === 'web' ? 400 : '90%',
    maxHeight: '80%',
    backgroundColor: '#1A1D21',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  countryList: {
    maxHeight: 300,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#48B8A0',
  },
}); 