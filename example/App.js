import { Provider } from 'aniuta';
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import CounterButtons from './src/components/counterButtons';
import CounterDisplay from './src/components/counterDisplay';

export default function App() {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor='blue' barStyle='dark-content' />
         <Provider>
            <CounterButtons />
            <CounterDisplay />
         </Provider>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
