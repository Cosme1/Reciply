import React, {useEffect, useState} from 'react';
import {
	AppRegistry,
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	Animated,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native-elements/dist/image/Image';
import CreateRecipeLayout from './CreateRecipeScreen';
import {Food} from './CreateRecipeScreen';
import realm from '../database/Realm';
import {RecipeItem} from '../components/RecipeItem';
import {Button} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';

// export function setNewRecipe(Name, Calories, vegetarian, preptime) {
//   //store.get('key').then(key => const key);
//   //   console.log(key + 'key');
//   //   store.get(key).then(value => {
//   //     tempname = value.setname;
//   //   });
//   //   store.get(key).then(value => {
//   //     console.log(value.setcalories + ' value');
//   //     tempcalories = value.setcalories;
//   //   });
//   //   store.get(key).then(value => {
//   //     console.log(value.setpreptime + ' value');
//   //     temppreptime = value.setpreptime;
//   //   });
//   //   index = index + 1;
//   //   console.log(index);
//   const NewRecipe = realm.objects('_RecipeSchema');
//   return (
//     <TouchableHighlight style={{paddingVertical: 5}}>
//       <View style={styles.button}>
//         <View>
//           <Text style={styles.foodTitle}>{NewRecipename}</Text>
//           {vegetarian ? (
//             <Text style={styles.foodSubtitle}>Vegetarian</Text>
//           ) : null}
//           <Text style={styles.foodSubtitle}>Calories: {Calories}</Text>
//         </View>
//         <Image
//           source={require('../assets/pizza.jpg')}
//           style={styles.image}></Image>
//       </View>
//     </TouchableHighlight>
//   );
// }

let Pizza = new Food('Pizza', 2269, true, 30);
let Pasta = new Food('Pasta', 2269, false, 30);

let recipesArray = [];
/*
		compares each string in the array and uses a quicksort to sort in order
*/

function quicksort(arr, pos = 0) {
	if (arr.length < 2) return arr; //if array only holds one value or less it doesn't need to be sorted

	const pivot = arr[arr.length - 1];
	const left = [];
	const right = [];

	while (pos < arr.length - 1) {
		if (arr[pos] < pivot) left.push(arr[pos]);
		else right.push(arr[pos]);
		pos++;
	}

	return [...quicksort(left), pivot, ...quicksort(right)];
}

function sortByName(arr, pos = 0) {
	//console.log(Object.values(recipesObject))
	/* 
		creates array but getting the name from each realmObject and put them together into an array
	*/
	// for (let i = 0; i < recipesObject.length; i++){
	// 	const names = realm.objects('_Recipe')[i]
	// 	NameArray[i] = names.setname
	// 	console.log(NameArray)
	// }
	/*
		Update realmObject by overwriting it with the quicksort function
	*/
	// let temp = [];
	// let sortedArr = quicksort(recipesArray.map(r => r.setname));
	// for (let i = 0; i < recipesArray.length; i++) {
	// 	console.log(sortedArr[i]);
	// 	console.log('i' + recipesArray[i].setname);
	// 	console.log('i+1' + recipesArray[i + 1].setname);
	// 	if (recipesArray[i].setname !== sortedArr[i]) {
	// 		temp = recipesArray[i];
	// 		recipesArray[i] = recipesArray[i + 1];
	// 		recipesArray[i + 1] = temp;
	// 		i = -1;
	// 	}
	// }
	// console.log(recipesArray.map(r => r.setname));
	if (arr.length < 2) return arr; //if array only holds one value or less it doesn't need to be sorted

	const pivot = arr[arr.length - 1].setname;
	const left = [];
	const right = [];

	while (pos < arr.length - 1) {
		if (arr[pos].setname < pivot) left.push(arr[pos]);
		else right.push(arr[pos]);
		pos++;
	}

	recipesArray = [...quicksort(left), pivot, ...quicksort(right)];
}

function sortByCalories(recipesObject) {
	for (let i = 0; i < recipesObject.length; i++) {
		const calories = realm.objects('_Recipe')[i];
		CaloriesArray[i] = parseInt(calories.setcalories);
		console.log(CaloriesArray);
	}

	console.log('calories: ' + quicksort(CaloriesArray));

	realm.write(() => {
		for (let i = 0; i < recipesObject.length; i++) {
			const calories = realm.objects('_Recipe')[i];
			calories.setcalories = quicksort(CaloriesArray)[i].toString();
		}
	});
}

function sortByPreperationtime(recipesObject) {}

const Recipes = realm.objects('_Recipe');

export function RecipeLayout({navigation}) {
	let veg;
	if (Pizza.vegetarian === true) {
		veg = <Text style={styles.foodSubtitle}>Vegetarian</Text>;
	} else {
		veg = null;
	}
	const [recipes, setrecipes] = useState([]);

	const Recipes = realm.objects('_Recipe');
	while (Recipes.length >= recipesArray) {
		for (let i = 0; i < Recipes.length; i++) {
			recipesArray.push(Recipes[i]);
		}
	}

	//recipesArray.push(Recipes.filter(recipe => recipe))
	console.log(recipesArray.filter(r => r));
	console.log(Recipes.filter(recipe => recipe));
	console.log(`These are all recipes: ${Recipes.map(Recipe => Recipe.setname)}`);
	realm.addListener('change', () => {
		setrecipes([Recipes]);
		console.log('Something happened!');
	});
	const [visible, setVisible] = useState(false);
	const toggleOverlay = React.useCallback(() => {
		setVisible(!visible);
	}, [visible]);
	useEffect(() => {
		navigation.setOptions({
			headerRight: function Header() {
				return (
					<View style={{flexDirection: 'row'}}>
						{/* <Icon name="sort" size={20} onPress={sortOverlay} />  */}
						<Button
							type="clear"
							title="&#61;"
							onPress={() => setVisible(true)}
							titleStyle={styles.addButton}
							//style={{transform: [{scale: 0.12}, {translateX: 900}]}}
						/>
						<Button
							type="clear"
							title="&#x2b;"
							onPress={() => navigation.navigate('CreateRecipe')}
							titleStyle={styles.addButton}
							//style={{transform: [{scale: 0.12}, {translateX: 900}]}}
						/>
					</View>
				);
			},
		});
	}, [navigation, Recipes, toggleOverlay]);

	const renderRightActions = (progress, dragX) => {
		const trans = dragX.interpolate({
			inputRange: [0, 50, 100, 101],
			outputRange: [-20, 0, 0, 1],
		});
		return (
			<Animated.View style={styles.deleteButton}>
				<TouchableOpacity>
					<Text style={styles.deleteText}>Delete</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Swipeable
				renderRightActions={renderRightActions}
				//onSwipeableRightOpen={delteRealmObject}
			>
				<TouchableHighlight style={{paddingVertical: 5}}>
					<View style={styles.button}>
						<View>
							<Text style={styles.foodTitle}>{Pizza.name}</Text>
							{veg}
							<Text style={styles.foodSubtitle}>Calories: {Pizza.calories}</Text>
						</View>
						<Image
							source={require('../assets/pizza.jpg')}
							style={styles.image}></Image>
					</View>
				</TouchableHighlight>
			</Swipeable>
			<TouchableHighlight style={{paddingVertical: 5}}>
				<View style={styles.button}>
					<View>
						<Text style={styles.foodTitle}>{Pasta.name}</Text>
						{veg}
						<Text style={styles.foodSubtitle}>Calories: {Pasta.calories}</Text>
					</View>
					<Image
						source={require('../assets/pizza.jpg')}
						style={styles.image}></Image>
				</View>
			</TouchableHighlight>
			{recipesArray.map(_recipe => (
				<RecipeItem key={`${_recipe.id}`} recipe={_recipe} />
			))}
			<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
				{
					<View>
						<Text style={styles.overlayText}>Sort by</Text>
						<Button title="Sort by Name" onPress={() => sortByName(recipesArray)} />
						<Button title="Sort by Calories" onPress={() => sortByCalories()} />
						<Button
							title="Sort by Preperation Time"
							onPress={() => sortByPreperationtime()}
						/>
					</View>
				}
			</Overlay>
		</ScrollView>
	);
}

// function RecipesScreen({navigation}) {
//   const Stack = createStackNavigator();
//   const Drawer = createDrawerNavigator();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Recipes"
//         component={RecipeLayout}
//         options={{
//           title: 'Recipes',
//           headerStyle: {
//             backgroundColor: '#9fc786',
//           },
//           headerTitleStyle: {
//             color: '#fff',
//             fontSize: 25,
//           },
//           //   headerLeft: () => (
//           //     <TouchableOpacity
//           //       style={{
//           //         transform: [{scale: 0.55}],
//           //       }}
//           //       onPress={() => navigation.openDrawer()}>
//           //       <Image source={require('../assets/ScreenButton.png')} />
//           //     </TouchableOpacity>
//           //   ),
//           headerRight: () => (
//             <TouchableOpacity
//               style={{
//                 transform: [{scale: 0.12}, {translateX: 900}],
//               }}
//               onPress={() => navigation.navigate('Add Recipe')}>
//               <Image source={require('../assets/Add.png')} />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Add Recipe"
//         component={CreateRecipeScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	button: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#CCCCCC',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 10,
	},

	foodTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	foodSubtitle: {
		fontSize: 10,
		color: 'black',
	},

	vegetarian: {
		fontSize: 10,
		color: 'green', //edit that later on
	},

	addButton: {
		fontSize: 30,
		fontWeight: '400',
	},
	deleteText: {
		color: '#fcfcfc',
		fontWeight: 'bold',
		padding: 3,
	},
	deleteView: {
		color: '#b60000',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100%',
	},
	overlayText: {
		fontSize: 20,
		padding: 3,
	},
	overlayButton: {},
});

//export default RecipesScreen;
