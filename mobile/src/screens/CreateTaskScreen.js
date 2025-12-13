import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import taskApi from '../api/taskApi';
import Button from '../components/Button';
import colors from '../constants/colors';

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate.toISOString(),
        status: 'pending',
      };

      await taskApi.createTask(taskData);
      Alert.alert('Success', 'Task created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const renderPriorityButton = (value, label) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        priority === value && { backgroundColor: colors[value] },
      ]}
      onPress={() => setPriority(value)}
    >
      <Text
        style={[
          styles.priorityText,
          priority === value && styles.priorityTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter task description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {renderPriorityButton('low', 'Low')}
            {renderPriorityButton('medium', 'Medium')}
            {renderPriorityButton('high', 'High')}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <Text style={styles.dateText}>
              {dueDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        <Button
          title="Create Task"
          onPress={handleCreate}
          loading={loading}
          style={styles.createButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  priorityTextActive: {
    color: colors.white,
  },
  dateButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginLeft: 12,
  },
  createButton: {
    marginTop: 8,
  },
});

export default CreateTaskScreen;
