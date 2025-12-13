import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

const LoadingSpinner = ({ 
  isLoading = true, 
  message = 'Loading...', 
  size = 'large',
  color = colors.primary 
}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator 
          size={size} 
          color={color} 
          animating={isLoading}
        />
        {message && (
          <Text style={styles.loadingText}>{message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 30,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
});

export default LoadingSpinner;
