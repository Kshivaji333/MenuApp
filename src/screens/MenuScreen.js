// MenuScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Animated
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
    {
      id: 1,
      name: "Starter",
      count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "STARTER").length
    },
    {
      id: 2,
      name: "Main Course",
      count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "MAIN COURSE").length
    },
    {
      id: 3,
      name: "Desert",
      count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "DESSERT").length
    },
    {
      id: 4,
      name: "Sides",
      count: selected.filter(id => dishes.find(d => d.id === id)?.mealType === "SIDES").length
    },
  ];

  const toggleSelect = (dish) => {
    if (selected.includes(dish.id)) {
      setSelected(selected.filter((id) => id !== dish.id));
    } else {
      setSelected([...selected, dish.id]);
    }
  };

  // Handler for Ingredient button
  const handleViewIngredients = (dish) => {
    navigation.navigate("Ingredient", { dish });
  };

  // Handler for Read more button
  const handleViewDetails = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = dish.mealType === (activeCategory === 1 ? "STARTER" :
      activeCategory === 2 ? "MAIN COURSE" :
        activeCategory === 3 ? "DESSERT" : "SIDES");
    const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesVeg = dish.type === "VEG";
    const matchesNonVeg = dish.type === "NON_VEG";
    const matchesType = (vegFilter && nonVegFilter) ? true : (vegFilter ? matchesVeg : (nonVegFilter ? matchesNonVeg : false));
    return matchesCategory && matchesSearch && matchesType;
  });

  const getCategoryName = () => {
    switch (activeCategory) {
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
      {/* Top Controls: Search, Tabs, Summary */}
      <View style={styles.topControls}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="< Search dish for your party......"
        />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
        <View style={styles.selectionSummary}>
          <Text style={styles.selectionText}>
            {getCategoryName()} Selected ({getCategoryCount()})
          </Text>

          <View style={styles.toggleContainer}>
            {/* Veg Switch */}
            <CustomToggle
              active={vegFilter}
              onToggle={() => setVegFilter(v => !v)}
              color="#4CAF50"
              ariaLabel="veg-filter"
            />

            {/* Non-Veg Switch */}
            <CustomToggle
              active={nonVegFilter}
              onToggle={() => setNonVegFilter(nv => !nv)}
              color="#FF4444"
              ariaLabel="nonveg-filter"
            />
          </View>
        </View>
      </View>

      {/* Dish List */}
      <ScrollView style={styles.dishList} contentContainerStyle={{ paddingBottom: 120 }}>
        {filteredDishes.map((item) => (
          <DishCard
            key={item.id}
            dish={item}
            isSelected={selected.includes(item.id)}
            onToggleSelect={toggleSelect}
            onViewIngredients={handleViewIngredients}
            onViewDetails={handleViewDetails}
          />
        ))}
      </ScrollView>

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
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedDish?.name}</Text>
                  <TouchableOpacity
                    style={selectedDish && selected.includes(selectedDish.id) ? styles.removeButton : styles.addButton}
                    onPress={() => {
                      if (selectedDish) toggleSelect(selectedDish);
                    }}
                  >
                    <Text style={selectedDish && selected.includes(selectedDish.id) ? styles.removeButtonText : styles.addButtonText}>
                      {selectedDish && selected.includes(selectedDish.id) ? 'Remove' : 'Add +'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: selectedDish?.image || 'https://via.placeholder.com/300x200' }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalDescription}>
                  {selectedDish?.description}
                </Text>
                <View style={{ marginBottom: 12 }}>
                  {selectedDish?.mealType && (
                    <Text style={{ fontSize: 14, color: '#333' }}>Meal Type: <Text style={{ fontWeight: 'bold' }}>{selectedDish.mealType}</Text></Text>
                  )}
                  {selectedDish?.type && (
                    <Text style={{ fontSize: 14, color: '#333' }}>Type: <Text style={{ fontWeight: 'bold' }}>{selectedDish.type}</Text></Text>
                  )}
                  {selectedDish?.dishType && (
                    <Text style={{ fontSize: 14, color: '#333' }}>Dish Type: <Text style={{ fontWeight: 'bold' }}>{selectedDish.dishType}</Text></Text>
                  )}
                  {selectedDish?.category?.name && (
                    <Text style={{ fontSize: 14, color: '#333' }}>Category: <Text style={{ fontWeight: 'bold' }}>{selectedDish.category.name}</Text></Text>
                  )}
                  <Text style={{ fontSize: 14, color: '#333' }}>For Party: <Text style={{ fontWeight: 'bold' }}>{selectedDish?.forParty ? 'Yes' : 'No'}</Text></Text>
                  <Text style={{ fontSize: 14, color: '#333' }}>For Chefit: <Text style={{ fontWeight: 'bold' }}>{selectedDish?.forChefit ? 'Yes' : 'No'}</Text></Text>
                </View>
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

/**
 * CustomToggle
 * - width: 54, height: 32 (matching your previous values)
 * - knob uses Animated to slide between left positions
 * - shows inner dot when active
 */
function CustomToggle({ active, onToggle, color = "#4CAF50", ariaLabel = "toggle" }) {
  const ANIM_LEFT_ON = 28;
  const ANIM_LEFT_OFF = 6;
  const anim = useRef(new Animated.Value(active ? ANIM_LEFT_ON : ANIM_LEFT_OFF)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? ANIM_LEFT_ON : ANIM_LEFT_OFF,
      duration: 160,
      useNativeDriver: false, // left positioning cannot use native driver
    }).start();
  }, [active, anim]);

  const knobStyle = {
    left: anim,
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={ariaLabel}
      activeOpacity={0.8}
      onPress={onToggle}
      style={[styles.switch, active ? { borderColor: color } : styles.switchInactive]}
    >
      <View style={styles.switchTrack} />
      <Animated.View style={[styles.knob, active ? { borderColor: color } : styles.knobInactive, knobStyle]}>
        {active ? <View style={[styles.knobDot, { backgroundColor: color }]} /> : null}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  topControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 4,
    marginBottom: 2,
    gap: 15,
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
    width: '100%',
  },
  selectionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Open Sans",
    letterSpacing: 0.2,
  },

  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  // switch container (outer)
  switch: {
    width: 50,
    height: 26,
    borderRadius: 16,
    backgroundColor: '#F7F7F7',
    borderWidth: 2,
    borderColor: '#E6E6E6',
    position: 'relative',
    marginHorizontal: 8,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  switchActiveVeg: {
    borderColor: '#4CAF50',
  },
  switchActiveNonVeg: {
    borderColor: '#FF4444',
  },
  switchInactive: {
    borderColor: '#E6E6E6',
    backgroundColor: '#F7F7F7',
    opacity: 0.95,
  },

  // track (background inside the pill)
  switchTrack: {
  
    position: 'absolute',
    left: 4,
    right: 4,
    top: 6.5,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    zIndex: 0,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  // knob (animated)
  knob: {
    position: 'absolute',
    top: 3,
    width: "32%",
    height: 16,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  knobInactive: {
    borderColor: '#E6E6E6',
    backgroundColor: '#fff',
    opacity: 0.95,
  },
  knobDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    alignSelf: 'center',
  },

  dishList: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
  },

  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fffaf4",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
  },

  totalText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 0.2,
  },
  continueButton: {
    textAlign: "center",
    backgroundColor: "#222",
    paddingVertical: 12,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '95%',
  },
  continueButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 0,
    padding: 16,
    width: "100%",
    minHeight: 320,
    marginHorizontal: 0,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
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
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
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
});
