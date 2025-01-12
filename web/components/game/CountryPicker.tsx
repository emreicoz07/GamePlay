import { useState } from 'react';
import { StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';

// This would typically come from an API or constants file
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  // Add more countries...
];

type CountryPickerProps = {
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
};

export function CountryPicker({ selectedCountry, onSelectCountry }: CountryPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCountryName = COUNTRIES.find(c => c.code === selectedCountry)?.name;

  return (
    <>
      <Button 
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        {selectedCountryName || 'Select Country'}
      </Button>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
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
                  <ThemedText>
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              )}
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
  button: {
    width: '100%',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    marginTop: 20,
  },
}); 