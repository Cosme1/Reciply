import React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Food} from './RecipesScreen';

let Pasta2 = new Food()



function CreateRecipeLayout() {
  return <ScrollView></ScrollView>;
}

function CreateRecipeScreen({navigation}) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateRecipes"
        component={CreateRecipeLayout}
        options={{
          title: 'Add Recipe',
          headerStyle: {
            backgroundColor: '#9fc786',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 25,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                transform: [{translateX: -390}, {scale: 0.045}, {scaleX: 0.9}],
              }}
              onPress={() => navigation.openDrawer()}>
              <Image source={require('../assets/ScreenButton.png')} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default CreateRecipeScreen;
