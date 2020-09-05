import React from 'react';
import { Text, StyleSheet } from 'react-native';

import useCounter from '../stores/useCounter';

export default function Counter() {
   const { count } = useCounter();

   return <Text style={styles.display}>Count: {count?.toString()}</Text>;
}

const styles = StyleSheet.create({
   display: {
      fontSize: 40,
      color: '#4a4a4a',
   },
});
