import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { gql, useMutation } from '@apollo/client';
const { width } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import { Modal } from 'react-native';
import { useRealm } from '@realm/react';
import { addInDB, getIntoDB } from '../realm/realmHelper/realmHelper';
import { LoginInfo } from '../realm/models/LoginInfo';
const LoginScreen: React.FC = () => {
  const [userName, setUserName] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  // const [email, setEmail] = useState('emilyspass');
  const [showAnimation, setShowAnimation] = useState(false);
  const realm = useRealm(); 
  const handleLogin = () => {
    if (!userName || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    api({
      variables: {
        username: userName,
        password: password,
      },
    })
      .then((response) => {
        console.error('Response:', response);
        if (response?.data) {
           addInDB(LoginInfo,"LoginInfo",response.data.login)
          setShowAnimation(true);
          setTimeout(() => {
            setShowAnimation(false);
            Alert.alert('Success', `Logged in! ${JSON.stringify(getIntoDB(LoginInfo,"LoginInfo"))}`);
          }, 2500); 
        } else {
          Alert.alert('Error', 'Login failed');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        Alert.alert('Error', 'An error occurred during login');
      });
  };

  const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      gender,
        email,
        firstName,
        image,
        id,
        lastName,
        token,
        username
    }
  }
`;



const [api] = useMutation(LOGIN_MUTATION)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>

{showAnimation && (
  <Modal transparent visible animationType="fade">
    <View style={styles.animationContainer}>
      <LottieView
        source={require('../assets/animations/paper-plane.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => setShowAnimation(false)}
        style={styles.lottieStyle}
      />
    </View>
  </Modal>
)}


      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: width * 0.85,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 40,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#1A1F3C',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#4C61FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    transform: [{ rotate: '180deg' }]
  },
  lottieStyle: { width: "100%", height: "100%" }
});

export default LoginScreen;
