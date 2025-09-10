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
import { imageMap } from '../images/imageMap';

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
            <CustomToggle
              active={vegFilter}
              onToggle={() => setVegFilter(v => !v)}
              color="#4CAF50"
              ariaLabel="veg-filter"
            />
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
          <Text style={styles.arrow}>{">"}</Text>
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
              <View style={styles.detailPopup}>
                <Image
                  source={imageMap[selectedDish?.image] || imageMap.default}
                  style={styles.detailImage}
                />
                <View style={styles.detailContent}>
                  <View style={styles.detailHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.detailTitle}>{selectedDish?.name}</Text>
                      <View style={styles.typeBox}>
                        <View style={[styles.typeDot, { backgroundColor: selectedDish?.type === 'NON_VEG' ? '#ff941A' : '#4CAF50' }]} />
                      </View>
                    </View>
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

                  <Text style={styles.detailDescription}>
                    <Text style={{ fontWeight: "600" }}>{selectedDish?.mealType} </Text>
                    {selectedDish?.description}
                  </Text>

                  <TouchableOpacity
                    style={styles.ingredientRow}
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate("Ingredient", { dish: selectedDish });
                    }}
                  >
                    <Text style={styles.ingredientLabel}>📑 Ingredient</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

/* CustomToggle component same as before */
function CustomToggle({ active, onToggle, color = "#4CAF50", ariaLabel = "toggle" }) {
  const ANIM_LEFT_ON = 28;
  const ANIM_LEFT_OFF = 6;
  const anim = useRef(new Animated.Value(active ? ANIM_LEFT_ON : ANIM_LEFT_OFF)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? ANIM_LEFT_ON : ANIM_LEFT_OFF,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [active, anim]);

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={ariaLabel}
      activeOpacity={0.8}
      onPress={onToggle}
      style={[styles.switch, active ? { borderColor: color } : styles.switchInactive]}
    >
      <View style={styles.switchTrack} />
      <Animated.View style={[styles.knob, active ? { borderColor: color } : styles.knobInactive, { left: anim }]}>
        {active ? <View style={[styles.knobDot, { backgroundColor: color }]} /> : null}
      </Animated.View>
    </TouchableOpacity>
  );
}


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
    justifyContent: 'center'
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