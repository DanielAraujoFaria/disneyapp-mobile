export interface DisneyResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Character[]
}

export interface Character {
    name: string;
    url: string;
}