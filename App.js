// In App.js in a new project

import React from 'react';
import {
  View,
  Text,
  Button,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image} from 'react-native-elements/dist/image/Image';
import {RecipeLayout} from './src/screens/RecipesScreen';
import CreateRecipeLayout from './src/screens/CreateRecipeScreen';
import {Provider} from './src/database/Provider';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

// const NavigationDrawerStructure = props => {
//   //Structure for the navigatin Drawer
//   const toggleDrawer = () => {
//     //Props to open/close the drawer
//     props.navigationProps.toggleDrawer();
//   };

//   return (
//     <View style={{flexDirection: 'row'}}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         <Image source={require('./src/assets/pizza.jpg')} />
//       </TouchableOpacity>
//       <Button title="somethign" />
//     </View>
//   );
// };

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Recipes">
        <Drawer.Screen
          name="Recipes"
          //component={RecipeLayout}
        >
          {props => {
            const {navigation} = props;
            return <RecipeLayout navigation={navigation} />;
          }}
        </Drawer.Screen>
        <Drawer.Screen name="CreateRecipe" component={CreateRecipeLayout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   headerStyle: {
//     color: 'blue',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
