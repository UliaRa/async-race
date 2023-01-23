import { ICar, CarData } from './types';
const server: String = 'http://127.0.0.1:3000';

enum Paths {
    cars = '/garage',
    winners = '/winners',
    engine = '/engine',
}

enum ParamsCar {
    page = '_page=',
    limit = '_limit=',
}

enum ParamsEngine {
    id = 'id=',
    status = 'status=',
}

export enum Engine {
    start = 'started',
    stop = 'stopped'
}

export async function getOneCar(id: number) {
    try {
        const response = await fetch(`${server}${Paths.cars}/${id}`);
        const car = await response.json();
        return car;
    } catch(err) {
        console.error(err); 
    }
}

export async function getCars(page: number) {
    const pageLimit: number = 7;

    try {
        const response = await fetch(`${server}${Paths.cars}/?${ParamsCar.page}${page}&${ParamsCar.limit}${pageLimit}`);
        return {
            cars: await response.json(),
            totalCount: response.headers.get('X-Total-Count') || '0',
        };
    } catch(err) {
        console.error(err); 
    }
}

export async function createCar(newCar: CarData) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    };
    try {
        const response = await fetch(`${server}${Paths.cars}`, settings);
        const car = await response.json();
        return car;
    } catch(err) {
        console.error(err); 
    }
}

export async function updateCar(newCar: ICar) {
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newCar.name,
            color: newCar.color
        }),
    };
    try {
        const response = await fetch(`${server}${Paths.cars}/${newCar.id}`, settings);
        const car = await response.json();
        return car;
    } catch(err) {
        console.error(err); 
    }
}

export async function deleteCar(id: number) {
    const settings = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(`${server}${Paths.cars}/${id}`, settings);
        const car = await response.json();
        return car;
    } catch(err) {
        console.error(err); 
    }
}

export async function getWinners(page: number) {
    const pageLimit: number = 7;

    try {
        const response = await fetch(`${server}${Paths.winners}/?${ParamsCar.page}${page}&${ParamsCar.limit}${pageLimit}`);
        return {
            winners: await response.json(),
            totalCount: response.headers.get('X-Total-Count') || '0',
        };
    } catch(err) {
        console.error(err); 
    }
}

export async function changeEngine(status: Engine, id: number) {
    const settings = {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(`${server}${Paths.engine}/?${ParamsEngine.id}${id}&${ParamsEngine.status}${status}`);
        const engine = await response.json();
        return engine;
    } catch(err) {
        console.error(err); 
    }
}
