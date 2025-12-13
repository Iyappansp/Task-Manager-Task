import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';

import colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner message="Loading app..." />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!user ? (
        // Auth Screens
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // Main App Screens
        <>
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
            options={{
              title: 'My Tasks',
            }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{
              title: 'Task Details',
            }}
          />
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={({ route }) => ({
              title: route.params?.mode === 'edit' ? 'Edit Task' : 'Create Task',
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
