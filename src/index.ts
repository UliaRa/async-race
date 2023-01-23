import { WinnersPage } from './components/winners';
import { GaragePage } from './components/garage/garage';

const main: HTMLElement | null = document.querySelector('main');
const btnGarage: HTMLElement | null = document.querySelector('#toGarageBtn');
const btnWinners: HTMLElement | null = document.querySelector('#toWinnersBtn');

if (btnGarage !== null) {
    btnGarage.addEventListener('click', () => {
       openTab(new GaragePage().element);
    });
}

if (btnWinners !== null) {
    btnWinners.addEventListener('click', () => {
        openTab(new WinnersPage().element);
    });
}

export function openTab(element: HTMLElement) {
    if (main !== null) {
        main.innerHTML = '';
        main.appendChild(element);
    }
}

