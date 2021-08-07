import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function CreateRecipeScreen({navigation}) {
	const Stack = createStackNavigator();
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

export default CreateRecipeScreen;