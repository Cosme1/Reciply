import React, {useEffect, useState} from 'react';
import {
	Button,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from 'react-native';

import realm from '../database/Realm';

function ShoppingListLayout({navigation}) {
	const Recipes = realm.objects('_Recipe');
	let shoppingListArray = [];
	let recipesArray = [];
	let ingredientsArray = [];

	while (Recipes.length != recipesArray.length) {
		recipesArray = [];
		for (let i = 0; i < Recipes.length; i++) {
			recipesArray.push(Recipes[i]);
		}
		console.log('Updating shoppinglist');
	}

	ingredientsArray = Recipes.map(Recipe => Recipe.ingredients);
	shoppingListArray = ingredientsArray.map(arr => arr);
	console.log(ingredientsArray.toString());
	console.log(shoppingListArray.toString());
	shoppingListArray.map(arr => console.log(arr));

	return <Text>test</Text>;
}

export default ShoppingListLayout;
