import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import { db } from "../configure/firebaseConfig.js"; // Example path
import Header from "../components/header.js";

const Contact = () => {

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Add data to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        message: values.message,
        timestamp: new Date(),
      });
      alert(`Thank you, ${values.fullName}, for your message!`);
      resetForm(); // Reset form fields after submission
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ImageBackground
        source={require("../assets/Contact Us/1.jpg")}
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Formik
          initialValues={{ fullName: "", phoneNumber: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Contact Us</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter name here"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
              />
              {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Enter phone number here"
                keyboardType="phone-pad"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Enter email here"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter message here"
                multiline
                value={values.message}
                onChangeText={handleChange("message")}
                onBlur={handleBlur("message")}
              />
              {touched.message && errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#66bb6a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Contact;

