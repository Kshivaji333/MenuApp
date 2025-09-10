import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageMap } from "../images/imageMap";
export default function IngredientScreen({ route, navigation }) {
  const { dish } = route.params;

  const ingredients = [
    { name: "Cauliflower", quantity: "01 Pc" },
    { name: "Mustard oil", quantity: "1/2 litres" },
    { name: "Cauliflower", quantity: "01 Pc" },
    { name: "Tomato", quantity: "01 Pc" },
  ];

  const renderIngredient = ({ item, index }) => (
    <View style={[styles.ingredientRow, index === ingredients.length - 1 && styles.noBorder]}>
      <Text style={styles.ingredientName}>{item.name}</Text>
      <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Ingredient list</Text>
      </View>

      {/* Dish Info */}
      <View style={styles.dishInfo}>
        <View style={styles.dishText}>
          <Text style={styles.dishTitle} numberOfLines={1} ellipsizeMode="tail">
            {dish?.name || "Fried Avocado Tacos..."}
          </Text>
          <Text style={styles.dishDescription} numberOfLines={2}>
            {dish?.description ||
              "Panco fried avocado, Mayo, panco fried avocado, Mayo, Panco fried avocado, Mayo, Panco fried avocado..."}
          </Text>
        </View>
        <View style={styles.dishImageCircle} />
        <Image
          source={imageMap[dish?.image] || imageMap.default}
          style={styles.dishImage}
        />
      </View>

      {/* Ingredients Section */}
      <View style={styles.ingredientsSection}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <Text style={styles.ingredientsSubtitle}>For 2 people</Text>
        <View style={styles.divider} />
        <View style={styles.ingredientsBox}>
          <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderIngredient}
            scrollEnabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 8,
  },
  backArrow: {
    fontSize: 30,
    color: "#000",
  },
  navTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#000",
  },
  dishInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    position: "relative",
    minHeight: 110,
    width: "100%",
  },
  dishText: {
    flex: 1,
    paddingRight: 0,
    justifyContent: "center",
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
    maxWidth: 160,
  },
  dishDescription: {
    fontSize: 15,
    color: "#555",
    lineHeight: 17,
    maxWidth: 250,
    marginBottom: 2,
  },
  dishImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    position: "absolute",
    right: 16,
    top: 8,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    resizeMode: "cover",
  },
  dishImageCircle: {
    position: "absolute",
    right: 8,
    top: 0,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f7f7f7",
    zIndex: 0,
  },
  ingredientsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
  },
  ingredientsSubtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  ingredientsBox: {
    borderWidth: 0,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginTop: 0,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 0,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  ingredientName: {
    fontSize: 14,
    color: "#222",
  },
  ingredientQuantity: {
    fontSize: 14,
    color: "#222",
  },
});
