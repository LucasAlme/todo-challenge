import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let valorIndex = tasks.findIndex(item => item.title === newTaskTitle);
    if (newTaskTitle != '' && valorIndex == -1) {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, data]);
    } else if (valorIndex !== -1) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const itemFind = updateTasks.find(itemFind => itemFind.id === id);
    if (!itemFind) return;
    itemFind.done = !itemFind.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {

    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
  }

  function alert(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [{ text: "Sim", onPress: () => handleRemoveTask(id) },
      { text: "Não" }]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const itemFind = updateTasks.find(itemFind => itemFind.id === taskId);
    if (!itemFind) return;
    itemFind.title = taskNewTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={(id) => handleToggleTaskDone(id)}
        removeTask={(id) => alert(id)}
        editTask={handleEditTask}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})