import React from 'react';
import { ScrollView } from 'react-native';
import DishCard from './DishCard';

export default function DishList({ items, selectedIds, onToggleSelect, onViewIngredients, onViewDetails }) {
  return (
    <ScrollView style={{ flex: 1, padding: 5, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 120 }}>
      {items.map((item) => (
        <DishCard
          key={item.id}
          dish={item}
          isSelected={selectedIds.includes(item.id)}
          onToggleSelect={onToggleSelect}
          onViewIngredients={onViewIngredients}
          onViewDetails={onViewDetails}
        />
      ))}
    </ScrollView>
  );
}


