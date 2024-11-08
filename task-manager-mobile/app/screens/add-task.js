import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";

export default AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !description) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Title and description cannot be empty.",
        topOffset: 10,
      });

      return;
    }

    try {
      await fetch("http://192.168.1.73:8080/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      Toast.show({
        type: "success",
        position: "top",
        text1: "Task Created",
        text2: "Task has been created successfully!",
        topOffset: 10,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Task not created.",
        topOffset: 10,
      });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: 80,
  },
});
