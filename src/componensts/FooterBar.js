import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FooterBar({ totalSelected }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <Text style={styles.totalText}>Total Dish Selected {totalSelected}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fffaf4',
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0
  },
  totalText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333'
  },
  arrow: {
    fontSize: 20,
    color: '3d3d3d'
  },
  continueButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    marginBottom: 15,
    borderRadius: 8,
    width: '95%'
  },
  continueButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});


