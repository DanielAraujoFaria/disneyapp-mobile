export interface DisneyCharacterDetails {
    _id: string;
    name: string;
    imageUrl: string;
    films?: string[];
    tvShows?: string[];
    parkAttractions?: string[];
}

export interface DisneyResponse {
    count: number;
    next?: string;
    previous?: string;
    results: DisneyCharacterDetails[];
}
