

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import LoginScreen from './src/screens/LoginScreen';
import { ApolloProvider } from '@apollo/client';
import client from './src/networks/ApolloClient';
import { RealmProvider } from '@realm/react';
AppRegistry.registerComponent(appName, () => App);
const App = () => {
        return (
                <RealmProvider>
                        <ApolloProvider client={client}>
                                <LoginScreen />
                        </ApolloProvider>
                </RealmProvider>
        )
}



