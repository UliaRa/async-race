import { CarItem } from './car-item';
import { createCar, getCars, updateCar } from '../../utils/db';
import { ICar } from '../../utils/types';
import { BaseComponent } from "../baseComponent";
import { openTab } from '../..';

export class GaragePage extends BaseComponent {
    page: number;
    constructor() {
        super('div', 'garage');
        this.page = 1;
        this.element.innerHTML = `
          <div class="garage__form">
            <input type="text" id="nameCreateInput"/>
            <input type="color" id="colorCreateInput"/>
            <button id="createBtn">Create</button>
          </div>
          <div class="garage__form">
            <input type="text" id="nameUpdateInput"/>
            <input type="color" id="colorUpdateInput"/>
            <button id="updateBtn">Update</button>
          </div>
          <h1>Garage (<span id="carsLength">0</span>)</h1>
          <div class="garage__main"></div>
          <div class="garage__pagination">
            <p>Page <span id="pageSpan">${this.page}</span></p>
            <div class="garage__controls">
              <button id="prevBtn">Previous</button>
              <button id="nextBtn">Next</button>
            </div>
          </div>
        `;

        const carsLengthSpan: HTMLElement | null = this.element.querySelector('#carsLength');
        const main: HTMLElement | null = this.element.querySelector('.garage__main');

        const nameCreateInput: HTMLInputElement | null = this.element.querySelector('#nameCreateInput');
        const colorCreateInput: HTMLInputElement | null = this.element.querySelector('#colorCreateInput');
        const createBtn: HTMLElement | null = this.element.querySelector('#createBtn');

        setData(1);

        if (createBtn !== null && main !== null) {
            createBtn.addEventListener('click', () => {
                if (nameCreateInput !== null && colorCreateInput !== null
                    && nameCreateInput.value !== ' '
                    && colorCreateInput.value !== ' ') {
                        createCar({
                            color: colorCreateInput.value,
                            name: nameCreateInput.value
                        }).then((data) => {
                            openTab(new GaragePage().element);
                        })
                    }
            });
        }

        const prevBtn: HTMLElement | null = this.element.querySelector('#prevBtn');
        const nextBtn: HTMLElement | null = this.element.querySelector('#nextBtn');
        const pageSpan: HTMLElement | null = this.element.querySelector('#pageSpan');


        if (prevBtn !== null) {
            prevBtn.addEventListener('click', () => {
                if (this.page > 1) {
                    this.page -= 1;
                    setData(this.page);
                    if (pageSpan !== null) pageSpan.innerHTML = (this.page).toString();
                }
            });
        }

        if (nextBtn !== null) {
            nextBtn.addEventListener('click', () => {
                this.page += 1;
                setData(this.page);
                if (pageSpan !== null) pageSpan.innerHTML = (this.page).toString();
            });
        }

        function setData(page: number) {
            if (main !== null) main.innerHTML = ' ';
            
            getCars(page).then((data) => {
                if (main !== null) {
                    data?.cars.forEach((x: ICar) => {
                        const car: ICar = {
                            name: x.name,
                            color: x.color,
                            id: x.id
                        }
                        addNewCarBlock(main, car);
                        if (carsLengthSpan !== null) carsLengthSpan.innerHTML = data.totalCount;
                    });
                }
            });
        }

        const addNewCarBlock = (main: HTMLElement, data: ICar) => {
            main.appendChild(new CarItem(data, this.selectCar.bind(this)).element);
        }
    }

    selectCar(car: ICar) {
        const nameUpdateInput: HTMLInputElement | null = this.element.querySelector('#nameUpdateInput');
        const colorUpdateInput: HTMLInputElement | null = this.element.querySelector('#colorUpdateInput');
        const updateBtn: HTMLElement | null = this.element.querySelector('#updateBtn');

        if (nameUpdateInput !== null && colorUpdateInput !== null) {
            nameUpdateInput.value = car.name as string;
            colorUpdateInput.value = car.color as string;

            if (updateBtn !== null) {
                updateBtn.addEventListener('click', () => {
                    const newCar: ICar = {
                        id: car.id,
                        name: nameUpdateInput?.value,
                        color: colorUpdateInput?.value,
                    }
                    updateCar(newCar).then((data) => {
                        openTab(new GaragePage().element);
                        nameUpdateInput.value = ' ';
                        colorUpdateInput.value = 'black';
                    });
                });
            }
        }
    }
}