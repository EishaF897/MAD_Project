import React, { useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Context } from './context'; // Adjust the import based on your context file

const Model = ({ isModalVisible, setModalVisible, currentPizza }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { pizzaAddToCart } = useContext(Context);

  const handleConfirm = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to the cart.');
      return;
    }

    // Find the selected price based on the selected size
    const selectedPrice = currentPizza.prices.find(
      (priceObj) => priceObj.Size === selectedSize
    )?.Price;

    if (!selectedPrice) {
      alert('Invalid size selected!');
      return;
    }

    pizzaAddToCart({ ...currentPizza, Size: selectedSize, Price: selectedPrice });
    setModalVisible(false);
  };

  if (!currentPizza) return null;

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Display Pizza Details */}
          <Image source={{ uri: currentPizza.Image }} style={styles.pizzaImage} />
          <Text style={styles.modalTitle}>{currentPizza.Name}</Text>
          <Text style={styles.modalDescription}>{currentPizza.dDscription}</Text>

          <Text style={styles.selectSizeTitle}>Select Pizza Size</Text>
          {currentPizza.prices.map((priceObj) => (
            <TouchableOpacity
              key={priceObj.Size}
              onPress={() => setSelectedSize(priceObj.Size)}
              style={[
                styles.modalOption,
                selectedSize === priceObj.Size && styles.selectedOption,
              ]}
            >
              <Text style={styles.modalOptionText}>
                {priceObj.Size} - Rs. {priceObj.Price}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  pizzaImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  selectSizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  modalButton: {
    backgroundColor: '#b91c1c',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Model;