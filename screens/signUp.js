import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView } from 'react-native';
import { auth } from '../configure/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = ({ navigation }) => {
  // Clear fields when returning to this page
  useEffect(() => {
    // No need to manually clear fields as Formik handles it
  }, []);

  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successfully");
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Login/background.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Signup</Text>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={styles.input}
                  secureTextEntry
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkHighlight}>Login</Text>
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

export default Signup;
