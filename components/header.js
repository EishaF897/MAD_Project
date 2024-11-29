import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icons from 'react-native-vector-icons/FontAwesome'; // Import Icon for Hamburger Nav Bar

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      
      {/* Logo and Name */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Header/logo.png')} // Update with the actual path to your logo image
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Pizzalicious</Text>
      </View>

      {/* Sign In/Register Button */}
      <TouchableOpacity style={styles.signinButton} 
       onPress={() => navigation.navigate('Sign Up')}
       >
        <Text style={styles.signinButtonText}>Sign In/Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Layout in a horizontal row
    justifyContent: 'space-between', // Distribute space between items
    alignItems: 'center', // Align items vertically in the center
    backgroundColor: '#c72c2c', // Navigation bar background color
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%', // Ensures the navbar stretches across the screen
  },
  hamburgerMenu: {
    padding: 5, // Add touchable area for the icon
  },
  logoContainer: {
    flexDirection: 'row', // Arrange the logo and text in a horizontal row
    alignItems: 'center', // Align vertically in the center
    marginLeft: 10, // Shift the logo and text closer to the left
    flex: 1, // Allow it to take up available space
  },
  logoImage: {
    width: 30, // Set appropriate width for your logo
    height: 30, // Set appropriate height for your logo
    marginRight: 5, // Space between the logo and text
  },
  logoText: {
    color: 'white', // Logo text color
    fontSize: 20,
    fontWeight: 'bold',
  },
  signinButton: {
    backgroundColor: 'white', // Button background
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  signinButtonText: {
    color: '#c72c2c', // Text color matches header background
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Header;