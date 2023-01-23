import { getOneCar, getWinners } from "../utils/db";
import { IWinner } from "../utils/types";
import { BaseComponent } from "./baseComponent";

export class WinnersPage extends BaseComponent {
    constructor() {
        super('div', 'winners');
        this.element.innerHTML = `
        <h1>Winners (<span id="winnersLength">0</span>)</h1>
        <table id="winnersTable">
          <thead>
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Time</th>
            </tr>
          </thead>
        </table>
        `;

        const winnersLengthSpan: HTMLElement | null = this.element.querySelector('#winnersLength');
        const winnersTable: HTMLTableElement | null = this.element.querySelector('#winnersTable');

        setData(1);

        function setData(page: number) {
          //if (main !== null) main.innerHTML = ' ';
          
          getWinners(page).then((data) => {
              //if (main !== null) {
                  data?.winners.forEach((x: IWinner) => {
                      const winner: IWinner = {
                          wins: x.wins,
                          time: x.time,
                          id: x.id
                      }
                      addNewRow(winner, winnersTable);
                      if (winnersLengthSpan !== null) winnersLengthSpan.innerHTML = data.totalCount;
                  });
              //}
          });
      }
    }
}

function addNewRow(winner: IWinner, table: HTMLTableElement | null) {
  getOneCar(winner.id).then((data) => {
    if (table !== null) {
      console.log(data)
      const newRow = document.createElement('tr');
      newRow.innerHTML =  `
        <td>${winner.id}</td>
        <td>${data.color}</td>
        <td>${data.name}</td>
        <td>${winner.wins}</td>
        <td>${winner.time}</td>
      `;
      table.append(newRow);
    }
  });
}
