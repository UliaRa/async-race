export interface ICar {
    name: String;
    id: number;
    color: String
}

export type CarData = Omit<ICar, 'id'>;

export interface IWinner {
    id: number,
    wins: number,
    time: number
}

export interface IEngine {
    velocity: number,
    distance: number
}