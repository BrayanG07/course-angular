import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  styleUrl: './list.component.css',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Output()
  onDeleteCharacter: EventEmitter<string> = new EventEmitter();

  @Input() // * Indicamos que recibiremos una propiedad
  public characterList: Character[] = [];

  emitDeleteCharacter(id: string): void {
    this.onDeleteCharacter.emit(id);
  }
}
