import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Context } from "../components/context"; // Import Cart Context
import { db } from "../configure/firebaseConfig"; // Firebase Config
import { collection, addDoc } from "firebase/firestore";

const Checkout = ({ navigation }) => {
  const { cart, clearCart } = useContext(Context); // Access cart and clearCart function

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
  });

  // Handle order submission
  const handleSubmit = async (values, { resetForm }) => {
    const orderData = {
      name: values.name,
      address: values.address,
      cartItems: cart,
      totalAmount: cart.reduce((total, item) => total + item.Price * item.quantity, 0),
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData); // Add order to Firestore
      Alert.alert("Success", "Your order has been placed!");
      clearCart(); // Clear the cart after successful order
      resetForm(); // Reset form fields
      navigation.navigate("Menu"); // Navigate back to the Menu screen
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Error", "Something went wrong while placing your order.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{ name: "", address: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <View>
            <Text style={styles.heading}>Checkout</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Address Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

            {/* Order Summary */}
            <View style={styles.orderSummaryContainer}>
              <Text style={styles.orderSummaryHeading}>Order Summary</Text>
              {cart.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <Text style={styles.orderItemText}>{item.Name}</Text>
                  <Text style={styles.orderItemText}>Size: {item.Size}</Text>
                  <Text style={styles.orderItemText}>Price: Rs {item.Price}</Text>
                  <Text style={styles.orderItemText}>Quantity: {item.quantity}</Text>
                </View>
              ))}
              <Text style={styles.totalAmount}>
                Total: Rs{" "}
                {cart.reduce((total, item) => total + item.Price * item.quantity, 0)}
              </Text>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity style={styles.placeOrderButton} onPress={handleSubmit}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  orderSummaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderSummaryHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: "#555",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
  placeOrderButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Checkout;
