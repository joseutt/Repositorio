import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import nflLogo from './assets/nfl.png'; 

const url = 'https://jsonplaceholder.typicode.com/todos';
const Menu = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const Todos = (option) => {
    let filteredData;
    switch (option) {
      case 'Todos (solo IDs)':
        filteredData = todos.map(todo => ({ id: todo.id }));
        break;
      case 'Todos (ID y Título)':
        filteredData = todos.map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Sin resolver (ID y Título)':
        filteredData = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Resueltos (ID y Título)':
        filteredData = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Todos (ID y Usuario)':
        filteredData = todos.map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Sin resolver (ID y Usuario)':
        filteredData = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Resueltos (ID y Usuario)':
        filteredData = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      default:
        filteredData = [];
    }

    navigation.navigate('TodoDetails', { todos: filteredData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={nflLogo} style={styles.logo} resizeMode="contain" />
        {['Todos (solo IDs)', 'Todos (ID y Título)', 'Sin resolver (ID y Título)', 'Resueltos (ID y Título)', 'Todos (ID y Usuario)', 'Sin resolver (ID y Usuario)', 'Resueltos (ID y Usuario)'].map(option => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => Todos(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const TodosDetail = ({ route }) => {
  const { todos } = route.params;
  return (
    <ScrollView style={styles.resultsContainer}>
      {todos.map((todo, index) => (
        <View key={todo.id.toString()} style={styles.tableRow}>
          <Text style={styles.tableCell}>{`ID: ${todo.id}`}</Text>
          {todo.title && <Text style={styles.tableCell}>{`Title: ${todo.title}`}</Text>}
          {todo.userId && <Text style={styles.tableCell}>{`User: ${todo.userId}`}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Lista de pendientes de  la NFL' }} />
        <Stack.Screen name="TodoDetails" component={TodosDetail} options={{ title: 'Lista de detalles' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '20%',
    height: 100, 
    marginBottom: 10,
  },
  optionButton: {
    width: '50%',
    padding: 10,
    backgroundColor: '#1E8449',
    borderRadius: 5,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    color: '#F1C40F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#A93226',
    marginHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
});

export default App;