import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PrimaryButton = ({ label, onPress }) => (
  <Pressable style={styles.button} onPress={onPress} accessibilityRole="button">
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

PrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

PrimaryButton.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton;
