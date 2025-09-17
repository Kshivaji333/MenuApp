import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';

export default function CustomToggle({ active, onToggle, color = '#4CAF50', ariaLabel = 'toggle' }) {
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
      style={[styles.switch, active ? { borderColor: 'transparent' } : styles.switchInactive]}
    >
      <View style={styles.switchTrack} />
      <Animated.View style={[styles.knob, active ? { borderColor: color } : styles.knobInactive, { left: anim }]}>
        {active ? <View style={[styles.knobDot, { backgroundColor: color }]} /> : null}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    width: '32%',
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
});


