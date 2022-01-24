import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import realm from '../database/Realm';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export function RecipeItem({recipe}) {
  //   const actions = [
  //     {
  //       title: 'Delete',
  //       action: () => {
  //         deleteRecipe(recipe);
  //       },
  //     },
  //   ];
  console.log(`${realm.id}`);
  console.log(recipe.name);

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <View style={styles.deleteView}>
        <TouchableOpacity>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const delteRealmObject = () => {
    realm.write(() => {
      realm.delete(recipe);
    });
  };
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={delteRealmObject}>
      <TouchableHighlight key={realm.id} style={{paddingVertical: 5}}>
        <View style={styles.button}>
          <View>
            <Text style={styles.foodTitle}>{recipe.setname}</Text>
            {recipe.vegetarian ? (
              <Text style={styles.foodSubtitle}>Vegetarian</Text>
            ) : null}
            <Text style={styles.foodSubtitle}>
              Calories: {recipe.setcalories}
            </Text>
          </View>
          <Image
            source={require('../assets/pizza.jpg')}
            style={styles.image}></Image>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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
  deleteView: {
    backgroundColor: 'red',
    flex: 1,
    height: 110,
    alignSelf: 'center',
    right: 10,
  },

  deleteText: {
    color: '#fff',
    fontWeight: '600',
    paddingVertical: 45,
    paddingRight: 40,
    alignSelf: 'flex-end',
    direction: 'ltr',
  },
});
