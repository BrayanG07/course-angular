import { Component } from '@angular/core';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styles: ``,
})
export class UncommonPageComponent {
  // i18n Select
  public name: string = 'Brayan';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  // i18n Plural
  public clients: string[] = [
    'Maria',
    'Fernando',
    'Brayan',
    'Alejandra',
    'Jose',
    'Bernardo',
  ];
  public clientsMap = {
    '=0': 'No tenemos ningun cliente esperando.',
    '=1': 'Tenemos un cliente esperando',
    '=2': 'Tenemos 2 esperando',
    other: 'Tenemos # clientes esperando', // # = toma como argumento el valor en cuestion de evaluacion
  };

  // KeyValue Pipe
  public person = {
    address: 'Tegucigalpa, Francisco Morazan',
    age: 36,
    country: 'Honduras',
    email: 'brayan.alvarez@correo.com',
    firstName: 'Brayan',
    isActive: true,
    lastName: 'Alvarez',
    timezone: 'UTC-6',
  }

  // AsyncPipe
  public myObservableTimer = interval(20000).pipe(
    tap(value => console.log(value))
  )

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa')
    }, 3500);
  })

  changeClient(): void {
    this.name = 'Melissa';
    this.gender = 'female';
  }

  removeClient(): void {
    this.clients.pop();
  }
}
