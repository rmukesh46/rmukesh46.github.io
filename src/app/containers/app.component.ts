import { Component, OnInit } from '@angular/core';

import { Board } from '../services/board';
import { Cell } from '../services/cell';
import { Level, LEVELS } from '../services/level';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board: Board;
  result: string;
  level: Level = 'beginner';

  ngOnInit(): void {
    this.reset();
  }

  checkCell(cell: Cell): void {
    const result = this.board.checkCell(cell);
    if (result === 'gameover') {
      this.result = 'You lose';
    } else if (result === 'win') {
      this.result = 'You win';
      this.board.revealAll();
    }
  }

  flag(cell: Cell): void {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else if (cell.status === 'open') {
      cell.status = 'flag';
    }
  }

  reset(): void {
    const [size, mines] = LEVELS[this.level];
    this.board = new Board(size, mines);
    this.result = '';
  }

  changeLevel(level: Level): void {
    this.level = level;
    this.reset();
  }
}
