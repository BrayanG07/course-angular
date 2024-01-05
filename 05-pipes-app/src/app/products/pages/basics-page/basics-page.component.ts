import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styles: ``
})
export class BasicsPageComponent {
  public nameLower: string = 'brayan alvarez';
  public nameUpper: string = 'BRAYAN';
  public fullName: string = 'BraYaN AlVAreZ';

  // Fechas
  public currentDate: Date = new Date();
}
