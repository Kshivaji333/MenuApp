import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";

export default function IngredientScreen({ route, navigation }) {
  const { dish } = route.params;

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const ingredients = [
    // You can replace this with dish.ingredients if available in future
    { name: "Cauliflower", quantity: "01 Pc" },
    { name: "Mustard oil", quantity: "1/2 litres" },
    { name: "Tomato", quantity: "01 Pc" },
    { name: "Paneer", quantity: "200 gm" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.timeText}>{getCurrentTime()}</Text>
        <Text style={styles.title}>Summary -Trial Journey</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Ingredient list</Text>
      </View>

      {/* Dish Info */}
      <View style={styles.dishInfo}>
        <View style={styles.dishText}>
          <Text style={styles.dishTitle}>{dish?.name || 'Dish Name'}</Text>
          <Text style={styles.dishDescription}>
            {dish?.description || 'No description available.'}
          </Text>
        </View>
        <Image 
          source={{ uri: dish?.image || 'https://via.placeholder.com/100x100' }} 
          style={styles.dishImage} 
        />
      </View>

      {/* Ingredients Section */}
      <View style={styles.ingredientsSection}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <Text style={styles.ingredientsSubtitle}>For 2 people</Text>
        
        <View style={styles.ingredientsList}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
            </View>
          ))}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timeText: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    width: 60,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backArrow: {
    fontSize: 20,
    color: "#333",
    marginRight: 12,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  dishInfo: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dishText: {
    flex: 1,
    marginRight: 16,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  ingredientsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  ingredientsSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  ingredientName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  ingredientQuantity: {
    fontSize: 14,
    color: "#666",
  },
});
