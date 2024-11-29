import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../configure/firebaseConfig';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

const MenuAdmin = () => {
  const [input, setInput] = useState({
    Name: '',
    Description: '',
    Sizes: '', // Comma-separated sizes and prices
    Image: '',
    Category: '', // Category: mainMenu, deals, newArrivals or menu
  });
  const [deleteName, setDeleteName] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');

  const getCollectionName = (category) => {
    switch (category) {
      case 'mainMenu':
        return 'mainMenu';
      case 'deals':
        return 'deals';
      case 'newArrivals':
        return 'newArrivals';
      case 'menu':
        return 'menu';
      default:
        return null; // Invalid category
    }
  };

  const isValidInput = (input) => {
    return input.Name && input.Description && input.Sizes && input.Image && input.Category;
  };

  // Add Item to the Correct Collection
  const handleAddItem = async () => {
    if (!isValidInput(input)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const collectionName = getCollectionName(input.Category);

    if (!collectionName) {
      Alert.alert('Error', 'Invalid category. Use mainMenu, deals, or newArrivals.');
      return;
    }

    try {
      // Parse the Sizes input into an array of objects
      const sizesArray = input.Sizes.split(',').map(sizePrice => {
        const [sizeName, price] = sizePrice.trim().split(' ');
        return {
          Size: sizeName,
          Price: Number(price), // Convert price to a number
        };
      });

      // Prepare data for mainMenu
      const data = {
        Name: input.Name,
        Description: input.Description,
        Image: input.Image,
      };

      if (collectionName === 'mainMenu') {
        data.prices = sizesArray; // Add Prices array for mainMenu
      } else {
        // For other collections, just add Size and Price (assuming single value)
        data.Size = sizesArray[0]?.Size || ''; // Use first size as the main size
        data.Price = sizesArray[0]?.Price || 0; // Use first price as the main price
      }

      await addDoc(collection(db, collectionName), data);
      setInput({ Name: '', Description: '', Sizes: '', Image: '', Category: '' });
      Alert.alert('Success', 'Item added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item');
    }
  };

  // Delete Item from the Correct Collection
  const handleDeleteItem = async () => {
    if (!deleteName) {
      Alert.alert('Error', 'Please enter the name of the item to delete');
      return;
    }

    try {
      const collections = ['mainMenu', 'deals', 'newArrivals', 'menu'];
      let itemDeleted = false;

      for (const collectionName of collections) {
        const q = query(collection(db, collectionName), where('Name', '==', deleteName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          itemDeleted = true;
          break; // Stop searching once item is found and deleted
        }
      }

      if (itemDeleted) {
        Alert.alert('Success', 'Item deleted successfully');
        setDeleteName('');
      } else {
        Alert.alert('Error', 'Item not found in any category');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  // Update Item in the Correct Collection
  const handleUpdateItem = async () => {
    if (!updateName || !updateDescription || !updatePrice) {
      Alert.alert('Error', 'Please fill in all fields to update');
      return;
    }

    try {
      const collections = ['mainMenu', 'deals', 'newArrivals', 'menu'];
      let itemUpdated = false;

      for (const collectionName of collections) {
        const q = query(collection(db, collectionName), where('Name', '==', updateName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              Description: updateDescription,
              Price: updatePrice,
            });
          });
          itemUpdated = true;
          break; // Stop searching once item is found and updated
        }
      }

      if (itemUpdated) {
        Alert.alert('Success', 'Item updated successfully');
        setUpdateName('');
        setUpdateDescription('');
        setUpdatePrice('');
      } else {
        Alert.alert('Error', 'Item not found in any category');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Add Item Form */}
      <Text style={styles.sectionTitle}>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={input.Name}
        onChangeText={(text) => setInput({ ...input, Name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={input.Description}
        onChangeText={(text) => setInput({ ...input, Description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sizes and Prices (e.g., Small 100, Medium 150, Large 200)"
        value={input.Sizes}
        onChangeText={(text) => setInput({ ...input, Sizes: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={input.Image}
        onChangeText={(text) => setInput({ ...input, Image: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (mainMenu, deals, newArrivals)"
        value={input.Category}
        onChangeText={(text) => setInput({ ...input, Category: text })}
      />
      <Button title="Add Item" onPress={handleAddItem} color="#4CAF50" />

      {/* Delete Form */}
      <Text style={styles.sectionTitle}>Delete Item by Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={deleteName}
        onChangeText={setDeleteName}
      />
      <Button title="Delete Item" onPress={handleDeleteItem} color="#FF5722" />

      {/* Update Form */}
      <Text style={styles.sectionTitle}>Update Item by Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={updateName}
        onChangeText={setUpdateName}
      />
      <TextInput
        style={styles.input}
        placeholder="New Description"
        value={updateDescription}
        onChangeText={setUpdateDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="New Price"
        value={updatePrice}
        onChangeText={setUpdatePrice}
        keyboardType="numeric"
      />
      <Button title="Update Item" onPress={handleUpdateItem} color="#FF9800" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default MenuAdmin;