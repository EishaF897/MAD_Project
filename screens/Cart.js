import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Context } from '../components/context'; // Import CartContext
import Header from '../components/header';

const Cart = ({ navigation }) => {
  const { cart, incrementQuantity, decrementQuantity, clearCart } =
    useContext(Context);

  return (
    <ScrollView style={styles.container}>
      <Header/>
      <Text style={styles.heading}>My Cart</Text>
      {cart.length > 0 ? (
        cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            {/* Item Image */}
            <Image source={{ uri: item.Image }} style={styles.cartImage} />

            {/* Item Details */}
            <View style={styles.cartInfo}>
              <Text style={styles.name}>{item.Name}</Text>
              <Text style={styles.size}>{item.Description}</Text>
              <Text style={styles.size}>Size: {item.Size}</Text>
              <Text style={styles.price}>Price: Rs {item.Price}</Text>
            </View>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementQuantity(item.id)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => incrementQuantity(item.id)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <TouchableOpacity style={styles.Button} onPress={clearCart}>
          <Text style={styles.ButtonText}>CLEAR CART</Text>
        </TouchableOpacity>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
       <TouchableOpacity style={styles.Button} 
       onPress={() => navigation.navigate('Checkout')}
       >
         <Text style={styles.ButtonText}>PROCEED TO CHECKOUT</Text>
       </TouchableOpacity>
      )}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  cartImage: {
    width: 70,
    height: 100,
    borderRadius: 10,
  },
  cartInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  size: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  Button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Cart;