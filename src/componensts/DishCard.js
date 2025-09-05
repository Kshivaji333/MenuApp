import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DishCard = ({ dish, isSelected, onToggleSelect, onViewIngredients }) => {
  const getTypeColor = (type) => {
    return type === 'NON_VEG' ? '#FF4444' : '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: dish.image || 'https://via.placeholder.com/100x100' }} style={styles.image} />
        <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(dish.type) }]} />
        {dish.mealType === 'STARTER' && (
          <View style={styles.sizeIndicator}>
            <Text style={styles.sizeText}>S</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{dish.name}</Text>
          <View style={[styles.typeDot, { backgroundColor: getTypeColor(dish.type) }]} />
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}... Read more
        </Text>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.ingredientButton}
            onPress={() => onViewIngredients(dish)}
          >
            <Text style={styles.ingredientText}>Ingredient</Text>
          </TouchableOpacity>
          
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  typeIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sizeIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#2196F3',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  ingredientButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
  },
  ingredientText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  addButton: {
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#FFE6E6',
    borderColor: '#FF4444',
    borderWidth: 1,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '600',
  },
  removeButtonText: {
    color: '#FF4444',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DishCard;
