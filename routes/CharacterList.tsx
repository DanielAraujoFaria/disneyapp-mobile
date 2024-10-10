import { CharacterClient } from '@/client/client';
import { CharacterComponent } from '@/components/CharacterDetailsComponent';
import { Character } from '@/models/disney.interface';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CharacterList({ navigation }) {
    const [CharacterList, setCharacterList] = useState<Array<Character>>([])
    const [next, setNext] = useState('')
    const [characterName, setCharacerName] = useState('')

    useEffect(() => {
        fetchCharacters()
        fetchFavoriteCharacter()
    }, [])

    async function fetchCharacters(path?: string) {
        const response = await CharacterClient.getCharacter(path)
        setCharacterList(characterList => [...characterList, ...response.results])
        setNext(response.next ?? '')
    }

    async function clear() {
        fetchCharacters()
    }

    function favoriteCharacters(character: Character) {
        Alert.alert(
            "Favoritar",
            `Tem certeza de que gostaria de favoritar ${character.name}`,
            [
                {
                    text: "Não",
                    onPress: () => { }
                },
                {
                    text: "Sim",
                    onPress: () => {
                        console.log(character)
                        CharacterClient.saveCharacterLocal(character)
                    }
                }
            ]
        )
    }

    async function fetchFavoriteCharacter() {
        const result = await CharacterClient.getCharacterLocal()
        console.log(result)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Nome ou Numero do Personagem'
                    onChangeText={(text) => { setCharacterName(text) }}
                />
                <Button title="Pesquisar" onPress={() => {
                    if (characterName.length == 0) { return }
                    else {
                        navigation.navigate('Charater details', { name: characterName })
                    }
                }
                } />
                <Button title="Limpar" onPress={() => clear()} />
            </View>
            {
                <FlatList
                    style={styles.scrollContainer}
                    data={characterList}
                    renderItem={
                        ((characterDetails) => {
                            return (
                                <>
                                    <TouchableHighlight
                                        onLongPress={() => favoriteCharacters(characterDetails.item)}
                                        onPress={() =>
                                            navigation.navigate('Character details', { name: characterDetails.item.name })
                                        }>
                                        <CharacterComponent {...characterDetails.item} />
                                    </TouchableHighlight>
                                </>
                            )
                        }
                        )
                    }
                    onEndReached={() => fetchPokemons(next)}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flex: 10
    },
    searchContainer: {
        width: Dimensions.get('window').width,
        margin: 12,
        height: 56,
        flexDirection: 'row'
    }
});
