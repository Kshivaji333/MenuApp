import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomToggle from './CustomToggle';

export default function SelectionSummary({
  vegFilter,
  nonVegFilter,
  setVegFilter,
  setNonVegFilter,
  categoryName,
  categoryCount,
}) {
  return (
    <View style={styles.selectionSummary}>
      <Text style={styles.selectionText}>
        {categoryName} Selected ({categoryCount})
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
  );
}

const styles = StyleSheet.create({
  selectionSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: '100%'
  },
  selectionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333'
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
});


