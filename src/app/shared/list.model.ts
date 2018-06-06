import {Film} from './film.model';

export interface GreatsList{
    name: string;
    films: Film[];
    username: string;
    _id: string;
}