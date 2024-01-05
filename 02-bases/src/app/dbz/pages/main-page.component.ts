import { Component } from '@angular/core';
import { DbzService } from '../services/dbz.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  constructor(private dbzService: DbzService) {}

  get characters(): Character[] {
    return [...this.dbzService.characters];
  }

  receiveCharacterById(id: string): void {
    this.dbzService.deleteCharacterById(id);
  }

  receiveNewCharacter(character: Character): void {
    this.dbzService.createNewCharacter(character);
  }
}
