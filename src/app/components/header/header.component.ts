import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Level, LEVELS } from 'src/app/services/level';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() level: Level;
  @Input() result: string;

  @Output() changeLevel = new EventEmitter<Level>();

  levels = Object.keys(LEVELS);

  selected(level: Level): 'selected' | '' {
    return this.level === level ? 'selected' : '';
  }

  onClick(level: Level): false {
    this.changeLevel.emit(level);
    return false;
  }
}
