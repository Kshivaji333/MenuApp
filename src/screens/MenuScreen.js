// MenuScreen.js
import React, { useState} from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dishes from "../data/dishes.json";
import SearchBar from "../componensts/SearchBar";
import CategoryTabs from "../componensts/CategoryTabs";
import SelectionSummary from "../componensts/SelectionSummary";
import DishList from "../componensts/DishList";
import FooterBar from "../componensts/FooterBar";
import DishDetailModal from "../componensts/DishDetailModal";

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
    navigation.navigate("Ingredient", { dish });
  };

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
      {/* Top Controls */}
      <View style={styles.topControls}>
        <SearchBar
          value={searchText}
          setSearchText={setSearchText}
        />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
        <SelectionSummary
          vegFilter={vegFilter}
          nonVegFilter={nonVegFilter}
          setVegFilter={setVegFilter}
          setNonVegFilter={setNonVegFilter}
          categoryName={getCategoryName()}
          categoryCount={getCategoryCount()}
        />
      </View>

      {/* Dish List */}
      <DishList
        items={filteredDishes}
        selectedIds={selected}
        onToggleSelect={toggleSelect}
        onViewIngredients={handleViewIngredients}
        onViewDetails={handleViewDetails}
      />

      {/* Footer */}
      <FooterBar totalSelected={selected.length} />

      {/* Dish Detail Modal */}
      <DishDetailModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        selectedDish={selectedDish}
        selectedIds={selected}
        onToggleSelect={toggleSelect}
        onNavigateIngredient={() => { setShowModal(false); navigation.navigate("Ingredient", { dish: selectedDish }); }}
      />
    </SafeAreaView>
  );
}

/* CustomToggle moved to ../componensts/CustomToggle */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  topControls: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: 4,
    marginBottom: 2,
    gap: 15
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
    width: '100%'
  },
  selectionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333"
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
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
    borderColor: 'transparent',
  },
  switchActiveNonVeg: {
    borderColor: 'transparent',
  },
  switchInactive: {
    borderColor: '#E6E6E6',
    backgroundColor: '#F7F7F7'
  },
  switchTrack: {
    position: 'absolute',
    left: 4,
    right: 4,
    top: 6.5,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#E6E6E6'
  },
  knob: {
    position: 'absolute',
    top: 3,
    width: "32%",
    height: 16,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  knobInactive: {
    borderColor: '#E6E6E6'
  },
  knobDot: {
    width: 8,
    height: 8,
    borderRadius: 6
  },
  dishList: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
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
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0
  },
  totalText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333"
  },
  arrow: {
    fontSize: 20,
    color: '3d3d3d'
  },
  continueButton: {
    backgroundColor: "#222",
    paddingVertical: 12,
    marginBottom: 15,
    borderRadius: 8,
    width: '95%'
  },
  continueButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  detailPopup: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "50%",
  },
  detailImage: {
    width: "auto",
    height: 163,
    borderRadius: 24,
    margin:20,
    marginBottom: 25
  },
  detailContent: {
    padding: 16
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000"
  },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  removeButtonText: {
    color: "#FF6B6B",
    fontSize: 13,
    fontWeight: "600"
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600"
  },
  detailDescription: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    marginBottom: 12
  },
  ingredientRow: {
    marginTop: 8
  },
  ingredientLabel: {
    fontSize: 14,
    color: "#FF9800",
    fontWeight: "600"
  },
  typeBox: {
    width: 16,
    height: 16,
    borderWidth: 1.2,
    borderRadius: 4,
    marginLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  typeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  }
});