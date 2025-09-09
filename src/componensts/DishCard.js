import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imageMap } from '../images/imageMap'; 

const DishCard = ({ dish, isSelected, onToggleSelect, onViewIngredients, onViewDetails }) => {
  const getTypeColor = (type) => {
    return type === 'NON_VEG' ? '#FF4444' : '#4CAF50';
  };

  // get image from mapping (fallback to default if not found)
  const imageSource = imageMap[dish.image] || imageMap.default;

  return (
    <View style={styles.container}>
      {/* Left side: Name, type, description, ingredient */}
      <View style={styles.leftContent}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{dish.name}</Text>
          <View style={[styles.typeDot, { backgroundColor: getTypeColor(dish.type) }]} />
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.description} numberOfLines={2}>
            {dish.description}
          </Text>
          <TouchableOpacity onPress={() => onViewDetails(dish)}>
            <Text style={styles.readMore}>... Read more</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.ingredientButton}
          onPress={() => onViewIngredients(dish)}
        >
          <Text style={styles.ingredientText}>🍴 Ingredient</Text>
        </TouchableOpacity>
      </View>

      {/* Right side: Image and Add button */}
      <View style={styles.rightContent}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity 
          style={[styles.addButton, isSelected && styles.removeButton]}
          onPress={() => onToggleSelect(dish)}
        >
          <Text style={[styles.addButtonText, isSelected && styles.removeButtonText]}>
            {isSelected ? 'Remove' : 'Add +'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
    paddingRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginRight: 4,
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 12,
    color: '#666',
    maxWidth: 120,
  },
  readMore: {
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  ingredientButton: {
    marginTop: 6,
  },
  ingredientText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  rightContent: {
    alignItems: 'center',
    minWidth: 90,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#FFE6E6',
    borderColor: '#FF4444',
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButtonText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DishCard;
