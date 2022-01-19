import React from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import realm from '../database/Realm';

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
  return (
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
});
