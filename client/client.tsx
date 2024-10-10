import { Character, DisneyResponse } from "@/models/disney.interface"; // Ajuste conforme necessário
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const baseURL = 'https://api.disneyapi.dev/character';

const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (path: string) => client.get(path).then(responseBody)
};

export const CharacterClient = {
    getCharacters: (next?: string): Promise<DisneyResponse> => {
        if (next) {
            next = next.replace(`${baseURL}/character`, '');
            return requests.get(`character/${next}`);
        } else {
            return requests.get(`character`);
        }
    },
    getACharacter: (nameOrId: string): Promise<Character> => requests.get(`character/${nameOrId}`), // Usar Character em vez de CharacterDetails
    saveCharacterLocal: (character: Character): Promise<void> => {
        return AsyncStorage.setItem(`@character:${character.url}`, JSON.stringify(character));
    },
    removeCharacterLocal: (character: Character): Promise<void> => {
        console.log(character.url);
        return AsyncStorage.removeItem(`@character:${character.url}`);
    },
    getCharacterLocal: async (): Promise<Character[]> => {
        const keys = await AsyncStorage.getAllKeys();
        const fetchedKeys = keys.filter((k) => k.startsWith('@character:'));
        const result = await AsyncStorage.multiGet(fetchedKeys);

        return result.map((r) => {
            return JSON.parse(r[1]) as Character; // Aqui, você pode ajustar o tipo de retorno se necessário
        });
    }
};
