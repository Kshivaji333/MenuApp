import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryTabs = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            activeCategory === category.id && styles.activeTab
          ]}
          onPress={() => onCategorySelect(category.id)}
        >
          <Text style={[
            styles.tabText,
            activeCategory === category.id && styles.activeTabText
          ]}>
            {category.name} {category.count}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 5,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 0,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    alignSelf: 'flex-start',
    minWidth: 0,
  },
  activeTab: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
    borderWidth: 1.5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default CategoryTabs;
