import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import useCounter from '../stores/useCounter';

export default function Counter() {
   const { increment, decrement } = useCounter();

   return (
      <View>
         <Text style={styles.title}>Counter</Text>
         <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={decrement}>
               <Text style={styles.buttonLabel}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={increment}>
               <Text style={styles.buttonLabel}>+</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
   },
   title: {
      marginLeft: 16,
      color: '#8a8a8a',
      fontSize: 30,
   },
   button: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#fafafa',
      borderRadius: 10,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
   },
   buttonLabel: {
      color: '#4a4a4a',
      fontSize: 20,
   },
});
