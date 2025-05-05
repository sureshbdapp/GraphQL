import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import Registration from './src/screens/RegistrationScreen';
import {RealmProvider} from '@realm/react';
import {ApolloProvider} from '@apollo/client';
import client from './src/networks/ApolloClient';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();

export default function App() {
  return (
    // <SafeAreaProvider>
      <RealmProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Registration" component={Registration} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </RealmProvider>
    // </SafeAreaProvider>
  );
}
