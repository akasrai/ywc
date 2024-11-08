import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  const fetchTask = async () => {
    const res = await fetch("http://192.168.1.73:8080/api/tasks/list");
    const data = await res.json();

    setTasks(data.tasks);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTask();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteTask = async (id) => {
    try {
      await fetch(`http://192.168.1.73:8080/api/tasks/remove/${id}`, {
        method: "DELETE",
      });

      Toast.show({
        type: "success",
        position: "top",
        text1: "Task deleted",
        text2: "Task has been deleted successfully!",
        topOffset: 10,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Task not deleted.",
        topOffset: 10,
      });
    }

    fetchTask();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.map((task) => (
        <View key={task._id} style={styles.tasks}>
          <View style={styles.detail}>
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteTask(task._id)}
          >
            <Ionicons name="trash-outline" color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      ))}

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 15,
    paddingBottom: 50,
  },
  tasks: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
  detail: {
    flex: 1,
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
