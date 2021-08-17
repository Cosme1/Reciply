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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native-elements';
import {Food} from './RecipesScreen';
import ImageCropPicker from 'react-native-image-crop-picker';

let Pasta2 = new Food();

function CreateRecipeLayout() {
  const [image, setImage] = useState(undefined);
  const choosePhotofromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 700,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const text = React.useState(null);
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
      <TextInput style={styles.input} value={text} placeholder="Name" />
    </ScrollView>
  );
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

export default CreateRecipeScreen;
