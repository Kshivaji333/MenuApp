import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        <Image source={require('../images/searchIcon.png')} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
      // Removed shadow and elevation for a flat look
    },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
      flex: 1,
  },
    icon: {
      width: 22,
      height: 22,
      marginLeft: 8,
      tintColor: '#888',
    },
});

export default SearchBar;

