import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('05/10/2023');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    if (!firstName || !lastName || !dob || !phone || !email) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    createUserAPI();
  };

  const createUserAPI = async () => {
    try {
      const res = await axios.post(
        'https://staging-api.spofit365.io/api/v1/profile/create-user-profile',
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUxNywiaWF0IjoxNzQ1OTE4NzY5LCJleHAiOjE3NDcxMjgzNjl9.BHIKyFfuN_qoc2Qu0lnM335_JVnfGaBPf2BpxGJVqnE',
            role:1
        },
      );
      console.log(JSON.stringify(res));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.label}>Date of Birth</Text>
      {/* <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: dob ? '#fff' : '#ccc' }}>
          {dob ? dob.toDateString() : 'Select date of birth'}
        </Text>
      </TouchableOpacity> */}
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        placeholder="Enter phone number"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
      />


     

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A0E23',
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop:40
  },
  label: {
    color: '#fff',
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    // borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 14 : 10,
    color: '#fff',
    backgroundColor: '#1C1F36',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4C9EEB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
