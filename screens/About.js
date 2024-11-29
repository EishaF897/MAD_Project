import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/header.js';

const About = () => {
  return (
    <View style={styles.container}>
            {/* Header Section */}
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* About Section */}
        <View style={styles.aboutSection}>
          <Image
            source={require('../assets/AboutUs/pic8.jpeg')} // Replace with a valid image
            style={styles.image}
          />
          <Text style={styles.heading}>About Us</Text>
          <Text style={styles.subheading}>Our Pizzalicious Story</Text>
          <Text style={styles.description}>
            Welcome to our pizzalicious journey! Our story began with a passion for crafting the perfect slice of pizza,
            using only the freshest ingredients and time-honored recipes passed down through generations. What started
            as a humble kitchen experiment quickly evolved into a full-fledged dedication to delivering mouthwatering
            pizzas that delight the senses and warm the soul.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // Light gray background for a modern look
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  aboutSection: {
    padding: 25,
    backgroundColor: '#fff', // White background for the about section
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 280,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#ff7043', // Warm orange border for the image
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#B22222', // Matching color with the image border
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Bold', // Use modern font
  },
  subheading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff7043', // Darker orange
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto-Medium', // Modern font style
  },
  description: {
    fontSize: 16,
    color: '#424242', // Dark gray for better readability
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular', // Clean font style
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ff7043', // Matching footer color with the image border
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});

export default About;
