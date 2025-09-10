import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        <Image source={require("../images/searchIcon.png")} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginHorizontal: 14,
    marginTop: 10, marginBottom: 6,
    width: "100%",

  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#adadad",
    width: "100%",
    height: 48
  },
  input: { flex: 1, fontSize: 15, color: "#333", paddingVertical: 2 },
  icon: { width: 20, height: 20, marginLeft: 10, tintColor: "#888" },
});

export default SearchBar;
