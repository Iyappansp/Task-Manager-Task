import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import taskApi from '../api/taskApi';
import colors from '../constants/colors';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await taskApi.getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load task details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await taskApi.deleteTask(taskId);
              Alert.alert('Success', 'Task deleted successfully');
              navigation.navigate('TaskList');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('TaskForm', { mode: 'edit', task });
  };

  if (loading) {
    return <LoadingSpinner message="Loading task..." />;
  }

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  const statusColor = colors[task.status] || colors.gray;
  const priorityColor = colors[task.priority] || colors.gray;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: statusColor }]}>
            <Text style={styles.badgeText}>{task.status}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: priorityColor }]}>
            <Text style={styles.badgeText}>{task.priority}</Text>
          </View>
        </View>

        {task.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        )}

        {task.dueDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Due Date</Text>
            <Text style={styles.info}>
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Created At</Text>
          <Text style={styles.info}>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {task.updatedAt !== task.createdAt && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last Updated</Text>
            <Text style={styles.info}>
              {new Date(task.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <Button
            title="Edit Task"
            onPress={handleEdit}
            style={styles.editButton}
            disabled={deleting}
          />
          <Button
            title="Delete Task"
            onPress={handleDelete}
            variant="danger"
            loading={deleting}
          />
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  badgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    color: colors.text,
  },
  actions: {
    marginTop: 32,
    gap: 12,
  },
  editButton: {
    marginBottom: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.textLight,
  },
});

export default TaskDetailScreen;
