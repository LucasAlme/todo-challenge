import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    console.log(newTaskTitle)
    if (newTaskTitle != '') {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, data]);
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

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={(id) => handleToggleTaskDone(id)}
        removeTask={(id) => handleRemoveTask(id)}

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