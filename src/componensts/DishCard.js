import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imageMap } from '../images/imageMap';

function truncateDescription(desc) {
  if (!desc) {
    return '';
  }
  // Show full first line, then about 40% of second line (approx 60 chars for most fonts)
  const maxChars = 60;
  if (desc.length > maxChars) {
    return desc.substring(0, maxChars) + '...';
  }
  return desc;
}

const DishCard = ({ dish, isSelected, onToggleSelect, onViewIngredients, onViewDetails }) => {
  const getTypeColor = (type) => (type === 'NON_VEG' ? '#FF4444' : '#4CAF50');
  const imageSource = imageMap[dish.image] || imageMap.default;

  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.leftContent}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{dish.name}</Text>
          <View style={styles.typeBox}>
            <View style={[styles.typeDot, { backgroundColor: getTypeColor(dish.type) }]} />
          </View>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.description} numberOfLines={2}>
            {truncateDescription(dish.description)}
            <TouchableOpacity onPress={() => onViewDetails(dish)}>
              <Text style={styles.readMore}>  Read more</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <TouchableOpacity style={styles.ingredientButton} onPress={() => onViewIngredients(dish)}>
          <View style={styles.ingredientRow}>
            <Text style={styles.ingredientIcon}>🍴</Text>
            <Text style={styles.ingredientText}>Ingredient</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* RIGHT: image card with floating Add button */}
      <View style={styles.rightContent}>
        <View style={styles.imageCard}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onToggleSelect(dish)}
            style={[styles.fab, isSelected && styles.fabSelected]}
          >
            <Text style={[styles.fabText, isSelected && styles.fabTextSelected]}>
              {isSelected ? 'Remove' : 'Add +'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionRow: {
    marginTop: 2,
    marginBottom: 0,
    // maxWidth: 180,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 14,
    padding: 14,
    paddingRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'flex-start',
    minHeight: 110,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flexShrink: 1,
    marginRight: 2,
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
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 17,
    marginTop: 2,
    maxWidth: "100%",
  },
  readMore: {
    color: 'black',
    fontWeight: '700',
    fontSize: 13,
    position: 'relative',
    top: 4,
  },
  ingredientButton: {
    marginTop: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ingredientText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
  },
  rightContent: {
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  imageCard: {
    width: 74,
    height: 74,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  fab: {
    position: 'absolute',
    right: -8,
    bottom: -12,
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 5,
  },
  fabSelected: {
    borderColor: '#FF4444',
  },
  fabText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  fabTextSelected: {
    color: '#FF4444',
  },
});

export default DishCard;
