import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from 'src/app/services/board';
import { Cell } from 'src/app/services/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() board: Board;

  @Output() checkCell = new EventEmitter<Cell>();
  @Output() flag = new EventEmitter<Cell>();

  OnFlag(cell: Cell): false {
    this.flag.emit(cell);
    return false;
  }
}
