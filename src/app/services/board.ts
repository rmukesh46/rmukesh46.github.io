import { Cell } from './cell';

const PEERS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Board {
  cells: Cell[][] = [];

  private remainingCells = 0;

  // Contains all cells coordinates for getRandomUniqueCell
  private coordinates: string[] = [];

  constructor(size: number, mines: number) {
    // create an empty board
    this.initBoard(size);

    // Assign mines
    this.initMines(mines);

    // Assign proximity mines
    this.initProximityMines(size);

    this.remainingCells = size * size - mines;
  }

  checkCell(cell: Cell): 'gameover' | 'win' | null {
    if (cell.status !== 'open') {
      return;
    }

    if (cell.mine) {
      this.revealAll();
      return 'gameover';
    }

    cell.status = 'clear';

    // Empty cell, let's clear the whole block.
    if (cell.proximityMines === 0) {
      this.clearBlock(cell);
    }

    if (this.remainingCells-- <= 1) {
      return 'win';
    }

    return;
  }

  revealAll() {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.status = 'clear';
      }
    }
  }

  private initBoard(size: number): void {
    for (let y = 0; y < size; y += 1) {
      this.cells[y] = [];
      for (let x = 0; x < size; x += 1) {
        this.cells[y][x] = new Cell(y, x);
        // 0-0, 0-1 etc...
        this.coordinates.push(`${y}-${x}`);
      }
    }
  }

  private initMines(mines: number): void {
    for (let i = 0; i < mines; i += 1) {
      this.getRandomUniqueCell().mine = true;
    }
  }

  private getRandomUniqueCell(): Cell {
    // find random index
    const idx = Math.floor(Math.random() * this.coordinates.length);

    // delete the index and return its value
    const coord = this.coordinates.splice(idx, 1)[0];

    // split the coordinate
    const [y, x] = coord.split('-');

    return this.cells[+y][+x];
  }

  private initProximityMines(size: number): void {
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        for (const peer of PEERS) {
          const nextY = y + peer[0];
          const nextX = x + peer[1];
          if (this.hasNext(nextY, nextX) && this.cells[nextY][nextX].mine) {
            this.cells[y][x].proximityMines += 1;
          }
        }
      }
    }
  }

  private hasNext(y: number, x: number): boolean {
    return !!(this.cells[y] && this.cells[y][x]);
  }

  private clearBlock(cell: Cell) {
    for (const peer of PEERS) {
      const nextY = cell.row + peer[0];
      const nextX = cell.column + peer[1];
      if (this.hasNext(nextY, nextX)) {
        this.checkCell(this.cells[nextY][nextX]);
      }
    }
  }
}
