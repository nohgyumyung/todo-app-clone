import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo'

const { height, width } = Dimensions.get('window'); 

export default function App() {
  const [newToDo, setNewToDo] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'></StatusBar>
      <Text style={styles.title}>Things To Do</Text>
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder={'New To Do'} 
          onChangeText={newToDo => setNewToDo(newToDo)} 
          value={newToDo}
          placeholderTextColor={'#928A97'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <ToDo text={"Hello I'm a To Do"}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F85F73',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 80,
    fontWeight: '400',
    marginBottom: 20
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10, 
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 2
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#928A97',
    borderBottomWidth: 1,
    fontSize: 25 // fontsize 버그
  },
  toDos: {
    alignItems: 'center'
  }
});
