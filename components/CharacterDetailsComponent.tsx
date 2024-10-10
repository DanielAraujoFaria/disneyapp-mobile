import { CharacterClient } from '@/client/client';
import { Character } from "@/models/disney.interface";
import { DisneyCharacterDetails } from "@/models/disneyDetails.interface";
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export function CharacterComponent(props: Character) {
    const [characterDetails, setCharacterDetails] = useState<DisneyCharacterDetails | undefined>();

    useEffect(() => {
        fetchDetails();
    }, []);

    async function fetchDetails() {
        try {
            // Utilize getACharacter para buscar detalhes do personagem
            const response = await CharacterClient.getACharacter(props.url); 
            setCharacterDetails(response);
        } catch (error) {
            console.error("Erro ao buscar detalhes do personagem:", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text>{characterDetails?.name}</Text>
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} resizeMode="cover" source={require('../assets/images/disney-bg.png')}>
                    <Image style={styles.image} source={{ uri: characterDetails?.imageUrl }} />
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flex: 1,
        margin: 16,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        verticalAlign: 'middle'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    imageBackground: {
        height: 150,
        width: 150,
        padding: 40,
        flex: 2,
    },
    image: {
        height: 150,
        width: 150,
        justifyContent: 'center'
    }
});
