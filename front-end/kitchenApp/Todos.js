/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

/*import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import firebase from '@react-native-firebase/app';

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native + Firebaseeeee!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        {!firebase.apps.length && (
          <Text style={styles.instructions}>
            {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
//import React from 'react';
import { FlatList, View, ScrollView, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button, List } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function Todos() {
const [ todo, setTodo ] = useState('');
const [ loading, setLoading ] = useState(true);
const [ todos, setTodos ] = useState([]);
const ref = firestore().collection('kitchenApp');
async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }
  useEffect(() => {
     return ref.onSnapshot(querySnapshot => {
       const list = [];
       querySnapshot.forEach(doc => {
         const { title, complete } = doc.data();
         list.push({
           id: doc.id,
           title,
           complete,
         });
       });

       setTodos(list);

       if (loading) {
         setLoading(false);
       }
     });
   }, []);

  if (loading) {
    return null; // or a spinner
  }
  return (
    <>
          <Appbar>
            <Appbar.Content title={'Kitchen App'} />
          </Appbar>
          <FlatList
            style={{flex: 1}}
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Todo {...item} />}
          />
          <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
          <Button onPress={() => addTodo()}>Add TODO</Button>
        </>
      );
    }



export default Todos;