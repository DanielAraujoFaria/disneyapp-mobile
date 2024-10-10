import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Tela de Home (Lista de personagens)
function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Consumindo a API da Disney
    axios.get('https://api.disneyapi.dev/characters')
      .then(response => {
        setCharacters(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Details', { characterId: item._id })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Tela de Detalhes do personagem
function DetailsScreen({ route }) {
  const { characterId } = route.params;
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    // Buscando os detalhes do personagem
    axios.get(`https://api.disneyapi.dev/characters/${characterId}`)
      .then(response => {
        setCharacterDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [characterId]);

  if (!characterDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsName}>{characterDetails.name}</Text>

      {characterDetails.films && characterDetails.films.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Films:</Text>
          {characterDetails.films.map((film, index) => (
            <Text key={index}>{film}</Text>
          ))}
        </>
      )}

      {characterDetails.tvShows && characterDetails.tvShows.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>TV Shows:</Text>
          {characterDetails.tvShows.map((show, index) => (
            <Text key={index}>{show}</Text>
          ))}
        </>
      )}

      {characterDetails.parkAttractions && characterDetails.parkAttractions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Park Attractions:</Text>
          {characterDetails.parkAttractions.map((attraction, index) => (
            <Text key={index}>{attraction}</Text>
          ))}
        </>
      )}
    </View>
  );
}

// Configuração da navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 16,
  },
  detailsName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
