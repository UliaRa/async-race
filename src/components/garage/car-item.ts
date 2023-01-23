import { openTab } from '../..';
import { changeEngine, deleteCar, Engine, getOneCar } from '../../utils/db';
import { ICar, IEngine } from './../../utils/types';
import { BaseComponent } from './../baseComponent';
import { GaragePage } from './garage';
import './garage.scss';

export class CarItem extends BaseComponent {
    constructor(car: ICar, selectCar: (car: ICar) => void) {
        super('div', 'car');
        this.element.innerHTML = `
          <div class="car__info">
            <p id="carName">${car.name}</p>
            <div>
            <button id="selectBtn">Select</button>
            <button id="deleteBtn">Delete</button>
            <button id="engineBtn">Start</button>
            </div>
          </div>
          <div class="car__color"></div>
        `;

        const colorBlock: HTMLElement | null = this.element.querySelector('.car__color');
        this.setColorBlock(colorBlock, car.color as string);

        const selectBtn: HTMLElement | null = this.element.querySelector('#selectBtn');
        if (selectBtn !== null) {
            selectBtn.addEventListener('click', () => {
                selectCar(car);
            });
        }

        const deleteBtn: HTMLElement | null = this.element.querySelector('#deleteBtn');
        if (deleteBtn !== null) {
            deleteBtn.addEventListener('click', () => {
                deleteCar(car.id).then((data) => openTab(new GaragePage().element));
            });
        }

        const engineBtn: HTMLElement | null = this.element.querySelector('#engineBtn');
        if (engineBtn !== null) {
            engineBtn.addEventListener('click', () => {
                if (engineBtn.innerHTML === 'Start') {
                    engineBtn.innerHTML = 'Stop';
                    changeEngine(Engine.start, car.id).then((data) => {
                       const engine: IEngine = data;
                    });
                } else {
                    engineBtn.innerHTML = 'Start';
                    changeEngine(Engine.stop, car.id).then((data) => {
                        const engine: IEngine = data;
                     });
                }
            });
        }
    }

    setColorBlock(colorBlock: HTMLElement | null, color: string) {
        if (colorBlock !== null) colorBlock.style.backgroundColor = color;
    }
}