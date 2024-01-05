import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
})
export class AddCharacterComponent {
  // * Configurando para emitir un evento o enviar datos al componente padre
  @Output()
  onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0,
  };

  emitCharacter(): void {
    if (!this.character.name) {
      return;
    }

    // * Ejecutando el evento para enviar los datos al componente padre
    this.onNewCharacter.emit(this.character);

    this.character = { name: '', power: 0 };
  }
}
