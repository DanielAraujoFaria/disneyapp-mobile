import { CharacterDetailsComponent } from '@/components/CharacterDetailsComponent';
import { DisneyCharacterDetails } from '@/models/disneyDetails.interface';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function CharacterDetailsScreen({
    route: {
        params: {
            characterId = '',
        }
    }
}) {
    const [characterDetails, setCharacterDetails] = useState<DisneyCharacterDetails>();

    useEffect(() => {
        getCharacterDetails(characterId);
    }, []);

    async function getCharacterDetails(characterId: string) {
        try {
            const response = await axios.get<DisneyCharacterDetails>(`https://api.disneyapi.dev/characters/${characterId}`);
            setCharacterDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.detailsContainer}>
            {characterDetails && <CharacterDetailsComponent {...characterDetails} />}
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        alignItems: 'center',
        padding: 16
    },
    imageContainer: {
        height: 200,
        width: 200,
        marginBottom: 20
    },
    typePill: {
        margin: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#babaca',
        borderRadius: 50
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        marginVertical: 4
    }
});
