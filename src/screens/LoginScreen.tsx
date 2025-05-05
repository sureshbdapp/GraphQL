import React, {useState} from 'react';
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
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';

import {gql, useMutation} from '@apollo/client';
import LottieView from 'lottie-react-native';
import {useRealm} from '@realm/react';
import {addInDB, getIntoDB} from '../realm/realmHelper/realmHelper';
import {LoginInfo} from '../realm/models/LoginInfo';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');

type RootStackParamList = {
  LoginScreen: undefined;
  Registration: undefined;
  Dashboard: undefined;
};

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      gender
      email
      firstName
      image
      id
      lastName
      token
      username
    }
  }
`;

const LoginScreen: React.FC = () => {
  type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showAnimation, setShowAnimation] = useState(false);

  const [loginMutation,{loading}] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data?.login) {
        addInDB(LoginInfo, 'LoginInfo', data.login);
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          navigation.navigate('Dashboard');
        }, 2500);
      } else {
        Alert.alert('Error', 'Login failed: Invalid response');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    },
  });

  const handleLogin = () => {
    if (!userName || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    loginMutation({
      variables: {
        username: userName,
        password: password,
      },
    });
  };

  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
        {/* <Image source={}/> */}
      
      
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

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#ccc'}]}
          onPress={() =>{
             navigation.navigate('Registration')
             }}>
          <Text style={[styles.buttonText, {color: 'black'}]}>Registration</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    transform: [{rotate: '180deg'}],
  },
  lottieStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default LoginScreen;
