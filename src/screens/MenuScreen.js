import React, { useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Modal,
  Image,
  ScrollView
} from "react-native";
import dishes from "../data/dishes.json";
import SearchBar from "../componensts/SearchBar";
import CategoryTabs from "../componensts/CategoryTabs";
import DishCard from "../componensts/DishCard";

export default function MenuScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);

  const categories = [
    { id: 1, name: "Starter", count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "STARTER").length },
    { id: 2, name: "Main Course", count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "MAIN COURSE").length },
    { id: 3, name: "Desert", count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "DESSERT").length },
    { id: 4, name: "Sides", count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "SIDES").length },
  ];

  const toggleSelect = (dish) => {
    if (selected.includes(dish.id)) {
      setSelected(selected.filter((id) => id !== dish.id));
    } else {
      setSelected([...selected, dish.id]);
    }
  };

  const handleViewIngredients = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const filteredDishes = dishes.filter(dish => {
  const matchesCategory = dish.mealType === (activeCategory === 1 ? "STARTER" : 
                         activeCategory === 2 ? "MAIN COURSE" :
                         activeCategory === 3 ? "DESSERT" : "SIDES");
  const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase());
  const matchesVeg = vegFilter && dish.type === "VEG";
  const matchesNonVeg = nonVegFilter && dish.type === "NON_VEG";
  const matchesType = (vegFilter && nonVegFilter) ? true : (matchesVeg || matchesNonVeg);
  return matchesCategory && matchesSearch && matchesType;
  });

  const getCategoryName = () => {
    switch(activeCategory) {
      case 1: return "Starters";
      case 2: return "Main Courses";
      case 3: return "Desserts";
      case 4: return "Sides";
      default: return "Main Courses";
    }
  };

  const getCategoryCount = () => {
    return selected.filter(id => {
      const dish = dishes.find(d => d.id === id);
      return dish?.mealType === (activeCategory === 1 ? "STARTER" : 
                                 activeCategory === 2 ? "MAIN COURSE" :
                                 activeCategory === 3 ? "DESSERT" : "SIDES");
    }).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.timeText}>{getCurrentTime()}</Text>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <SearchBar 
        value={searchText}
        onChangeText={setSearchText}
        placeholder="< Search dish for your party......"
      />

      {/* Category Tabs */}
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      {/* Selection Summary */}
      <View style={styles.selectionSummary}>
        <Text style={styles.selectionText}>
          {getCategoryName()} Selected ({getCategoryCount()})
        </Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggle, vegFilter ? { backgroundColor: '#4CAF50', borderColor: '#4CAF50' } : styles.toggleOff]}
            onPress={() => setVegFilter(v => !v)}
          >
            <Text style={{ color: vegFilter ? '#fff' : '#666', fontSize: 12 }}>Veg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, nonVegFilter ? { backgroundColor: '#FF4444', borderColor: '#FF4444' } : styles.toggleOff]}
            onPress={() => setNonVegFilter(nv => !nv)}
          >
            <Text style={{ color: nonVegFilter ? '#fff' : '#666', fontSize: 12 }}>Non-Veg</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dish List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>North Indian</Text>
        <Text style={styles.arrow}>↑</Text>
      </View>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            isSelected={selected.includes(item.id)}
            onToggleSelect={toggleSelect}
            onViewIngredients={handleViewIngredients}
          />
        )}
        style={styles.dishList}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.totalText}>Total Dish Selected {selected.length}</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Dish Detail Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedDish?.name}</Text>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => {
                  if (selectedDish) toggleSelect(selectedDish);
                }}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
            
            <Image 
              source={{ uri: selectedDish?.image || 'https://via.placeholder.com/300x200' }} 
              style={styles.modalImage} 
            />
            
            <Text style={styles.modalDescription}>
              North Indian {selectedDish?.name} is a dish made from chicken marinated shgdhsdhgdshd is a dish made from chicken marinated
            </Text>
            
            <TouchableOpacity 
              style={styles.ingredientButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("Ingredient", { dish: selectedDish });
              }}
            >
              <Text style={styles.ingredientButtonText}>Ingredient</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sign up banner */}
      <View style={styles.signupBanner}>
        <Text style={styles.signupText}>Sign up to comment, edit, inspect and more.</Text>
        <View style={styles.signupButtons}>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButtonSmall}>
            <Text style={styles.continueButtonSmallText}>G Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 60,
  },
  selectionSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 0.2,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    marginHorizontal: 2,
    marginVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  toggleOff: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    letterSpacing: 0.2,
  },
  arrow: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  dishList: {
    flex: 1,
    paddingTop: 4,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 0.2,
  },
  continueButton: {
    backgroundColor: "#222",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#FF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  ingredientButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  ingredientButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  signupBanner: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  signupButtons: {
    flexDirection: "row",
    gap: 8,
  },
  signupButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  signupButtonText: {
    color: "#2196F3",
    fontSize: 12,
    fontWeight: "600",
  },
  continueButtonSmall: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  continueButtonSmallText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
