import React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as ImagePicker from 'react-native-image-picker';

import {Food} from './RecipesScreen';
import { useState } from 'react/cjs/react.production.min';

let Pasta2 = new Food();



function CreateRecipeLayout() {
	const setImageSource = useState<String|undefined>('../assets/Placeholder.png');
	var image = Boolean(false);
	renderImage = () => {
		if (setImageSource) {
			console.log('active');
			return <Image
			  source={{uri: setImageSource }}
			  style={styles.image}
			/>
		  } else {
			  console.log('inactive')
			return <Image
			  source={require('../assets/Placeholder.png')}
			  style={styles.image}
			/>
		  }
	}
  const text = React.useState(null);
  return (
    <ScrollView>
      <Button
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            response => {
				console.log('Response = ', response);
              if (response.didCancel) {
                console.log('canceled');
              } else {
                setImageSource(response.uri);
				image = true
				console.log(response);

				this.setState({
					fileUri: response.uri,
			  });
              }
			  
              
            },
          )
        }
        title="Select Image"
      />
	<TouchableOpacity>
		{renderImage()}
	</TouchableOpacity>
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
    height: 100,
    padding: 10,
  },
});

export default CreateRecipeScreen;
