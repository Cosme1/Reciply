// In App.js in a new project

import React from 'react';
import { View, Text, Button, useColorScheme, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RecipeScreen from './src/screens/RecipesScreen';

function HomeScreen({ navigation }) {
  return (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	  <Text>Home Screen</Text>
	  <Button
		title="Details"
		onPress={() => navigation.navigate('Details')}
	  />
	</View>
  );
}

function StackScreen() {
  return (
	<Stack.Navigator>
	  <Stack.Screen
		name="Home"
		component={HomeScreen}
		options={{ 
		  title: 'My home',
		  headerStyle: {
			backgroundColor: '#f4511e',
		  }
		 }}
	  />
	</Stack.Navigator>
  );
}

function DetailsScreen( {navigation} ) {
  return (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	  <Text>Details Screen</Text>
	  <Button
		title="Home"
		onPress={() => navigation.navigate('Home')}
	  />
	</View>
  );
}

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function App() {
  return (
	<NavigationContainer>
	  <Drawer.Navigator initialRouteName="Homee">
		<Drawer.Screen name="Home" component={HomeScreen} />
		<Drawer.Screen name="Recipes" component={RecipeScreen} />
		<Drawer.Screen name="StackScreen" component={StackScreen} />
	  </Drawer.Navigator>
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
	color: 'blue',
  },
  sectionTitle: {
	fontSize: 24,
	fontWeight: '600',
  },
  sectionDescription: {
	marginTop: 8,
	fontSize: 18,
	fontWeight: '400',
  },
  highlight: {
	fontWeight: '700',
  },
});

export default App;