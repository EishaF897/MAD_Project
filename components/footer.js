import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem}>
        <Icon name="user" size={24} color="white" />
        <Text style={styles.footerText}>My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Icon name="list" size={24} color="white" />
        <Text style={styles.footerText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Icon name="home" size={24} color="white" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Icon name="shopping-cart" size={24} color="white" />
        <Text style={styles.footerText}>My Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Icon name="envelope" size={24} color="white" />
        <Text style={styles.footerText}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#c72c2c',
    padding: 20,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginTop: 5,
  },
});

export default Footer;
