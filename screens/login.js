import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView } from 'react-native';
import { auth } from '../configure/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = ({ navigation }) => {
  const [isAdmin, setIsAdmin] = useState(false);  // Track if it's admin or user login

  useEffect(() => {
    // Clear fields when navigating back to the login page
    return () => {
      setIsAdmin(false);
    };
  }, []);

  const handleLogin = async (values) => {
    const adminEmail = "ali.khan@gmail.com"; // Hardcoded admin email
    const adminPassword = "ali123"; // Hardcoded admin password

    const { email, password } = values;

    if (isAdmin) {
      // Admin login logic: Only allow the hardcoded admin credentials
      if (email === adminEmail && password === adminPassword) {
        alert("Login Successfully")
        navigation.navigate('Admin'); // Admin is successfully logged in
      } else {
        alert('Invalid admin credentials!');
      }
    } else {
      // User login logic: Firebase authentication for regular users
      if (email === adminEmail && password === adminPassword) {
        alert('!Please use the Admin Login page.');
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Menu');
      } catch (error) {
        alert('Invalid user credentials or ' + error.message);
      }
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  return (
    <ImageBackground
      source={require('../assets/Login/background.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{isAdmin ? 'Admin Login' : 'User Login'}</Text>

          {/* Formik form */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={[styles.input, errors.email && touched.email && { borderColor: 'red', borderWidth: 1 }]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={[styles.input, errors.password && touched.password && { borderColor: 'red', borderWidth: 1 }]}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <TouchableOpacity
            onPress={() => setIsAdmin(!isAdmin)} 
            style={styles.link}
          >
            <Text style={styles.linkText}>
              {isAdmin 
                ? "Login as User instead?" 
                : "Login as Admin instead?"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
            <Text style={styles.linkText}>
              Don't have an account? <Text style={styles.linkHighlight}>Signup</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: '#B22222',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    elevation: 3,
  },
  button: {
    width: '100%',
    backgroundColor: '#74A12E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#000',
  },
  linkHighlight: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Login;
