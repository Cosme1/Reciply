import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageProps,
} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {
  NavigationContainer,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {createStackNavigator, StackView} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native-elements';
import {setNewRecipe} from './RecipesScreen';
import ImageCropPicker from 'react-native-image-crop-picker';
import SwitchSelector from 'react-native-switch-selector';
import {DebugInstructions} from 'react-native/Libraries/NewAppScreen';

let Pasta2 = new Food();

const recipeNameArray = [];

const options = [
  {label: 'Carni', value: '1'},
  {label: 'Vegetarian', value: '2'},
];

export function Food(name, calories, vegetarian, preptime) {
  this.name = name;
  this.calories = calories;
  this.vegetarian = vegetarian;
  this.preptime = preptime;
}

function CreateRecipeLayout({route, navigation}) {
  const {createRecipe} = route.params;

  //   const RecipeSchema = {
  //     name: '_Recipe',
  //     properties: {
  //       _id: 'int',
  //       setname: 'string',
  //       setcalories: 'string',
  //       setpreptime: 'string',
  //     },
  //   };

  //let realm = new Realm({schema: [RecipeSchema]});

  const [image, setImage] = useState(undefined);
  const choosePhotofromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 700,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log(image);
    });
  };

  const SaveButton = () => {
    // let newRecipe = new setNewRecipe();
    // console.log(Recipe);
    // let setRecipe;
    realm.write(() => {
      setRecipe = realm.create('_Recipe', {
        _id: 1,
        setname: name,
        setcalories: calories,
        setpreptime: preptime,
      });
    });

    // setRecipe.addListener((obj, changes) => {
    // 	changes.changedProperties.forEach((changedProperty) => {
    // 		console.log(
    // 		  `${obj.name}'s ${changedProperty} was altered to be ${obj[changedProperty]}`
    // 		);
    // 	  });
    // });

    // realm.close();
    //createRecipe(name, calories, preptime);
    navigation.dispatch(CommonActions.goBack()); // goes back to Recipe Screen
    // remove text fields
  };

  const [name, onChangeName] = useState(null);
  const [calories, onChangeCalories] = useState(null);
  const [preptime, onChangePrepTime] = useState(null);

  return (
    <ScrollView>
      <Image
        source={{uri: image}}
        style={styles.image}
        PlaceholderContent={
          <Image source={require('../assets/Placeholder.png')} />
        }
      />
      <Button title={'Choose Photo'} onPress={choosePhotofromLibrary}></Button>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={onChangeName}
      />
      <TextInput
        style={styles.input}
        value={calories}
        placeholder="Calories"
        keyboardType="number-pad"
        onChangeText={onChangeCalories}
      />
      <TextInput
        style={styles.input}
        value={preptime}
        placeholder="Preparation Time"
        keyboardType="number-pad"
        onChangeText={onChangePrepTime}
      />
      <SwitchSelector
        options={options}
        initial={0}
        onPress={value => console.log(`Call onPress with value: ${value}`)}
        buttonColor="#9fc786"
        style={{padding: 15}}
      />
      <Button title="Save" style={{flexbox: 1}} onPress={SaveButton} />
    </ScrollView>
  );
}

// function CreateRecipeScreen({navigation}) {
//   const Stack = createStackNavigator();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="CreateRecipes"
//         component={CreateRecipeLayout}
//         options={{
//           title: 'Add Recipe',
//           headerStyle: {
//             backgroundColor: '#9fc786',
//           },
//           headerTitleStyle: {
//             color: '#fff',
//             fontSize: 25,
//           },
//           headerLeft: () => (
//             <View>
//               <TouchableOpacity
//                 style={{
//                   transform: [
//                     {translateX: -390},
//                     {scale: 0.045},
//                     {scaleX: 0.9},
//                   ],
//                 }}
//                 onPress={() => navigation.openDrawer()}>
//                 <Image source={require('../assets/ScreenButton.png')} />
//               </TouchableOpacity>
//             </View>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  image: {
    padding: 10,
    margin: 10,
    minHeight: 200,
    resizeMode: 'contain',
  },
});
export {recipeNameArray};
export default CreateRecipeLayout;
