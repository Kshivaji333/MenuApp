import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { imageMap } from '../images/imageMap';

export default function DishDetailModal({ visible, onClose, selectedDish, selectedIds, onToggleSelect, onNavigateIngredient }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
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
                    style={selectedDish && selectedIds.includes(selectedDish.id) ? styles.removeButton : styles.addButton}
                    onPress={() => { if (selectedDish) onToggleSelect(selectedDish); }}
                  >
                    <Text style={selectedDish && selectedIds.includes(selectedDish.id) ? styles.removeButtonText : styles.addButtonText}>
                      {selectedDish && selectedIds.includes(selectedDish.id) ? 'Remove' : 'Add +'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.detailDescription}>
                  <Text style={{ fontWeight: '600' }}>{selectedDish?.mealType} </Text>
                  {selectedDish?.description}
                </Text>

                <TouchableOpacity
                  style={styles.ingredientRow}
                  onPress={onNavigateIngredient}
                >
                  <Text style={styles.ingredientLabel}>📑 Ingredient</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailPopup: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '50%',
  },
  detailImage: {
    width: 'auto',
    height: 163,
    borderRadius: 24,
    margin: 20,
    marginBottom: 25
  },
  detailContent: {
    padding: 16
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000'
  },
  removeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  removeButtonText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600'
  },
  detailDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 12
  },
  ingredientRow: {
    marginTop: 8
  },
  ingredientLabel: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
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
});


