import React from 'react';
import { Button, Image, View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateRecipeScreen from './CreateRecipeScreen';

foodtitle = 'Pizza'

function Ingredients() {
	
}

function Food (name, calories, vegetarian, preptime, ) {
	this.name = name;
	this.calories = calories;
	this.vegetarian = vegetarian;
	this.preptime = preptime;
	
}

let Pizza = new Food ('Pizza', 2269, true, 30);

function RecipeLayout() {
	return(
		<ScrollView style={styles.container}>
			<TouchableHighlight>
				<View style={styles.button}>
					<View>
						<Text style={styles.foodTitle}>{Pizza.name}</Text>
						<Text style={styles.foodSubtitle}>Calories: {Pizza.calories}</Text>
					</View>
					<Image source={require('../assets/pizza.jpg')} style={styles.image} ></Image>
				</View>
			</TouchableHighlight>
		</ScrollView>
	);
}

function RecipesScreen({navigation}) {
	const Stack = createStackNavigator();
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={RecipeLayout}
					options={{
					title: 'My home',
					headerStyle: {
						backgroundColor: '#9fc786',
					}
					}}
				/>
				<Stack.Screen name="Add Recipe" component={CreateRecipeScreen} />
			</Stack.Navigator>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,

	},
	button: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#CCCCCC',
		flexDirection: 'row',
		justifyContent: 'space-between'

	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 10
	},

	foodTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	foodSubtitle: {
		fontSize: 10,
		color: 'black',
	}
})

export default RecipesScreen;