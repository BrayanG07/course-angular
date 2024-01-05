import { Component, EffectCleanupRegisterFn, OnDestroy, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styles: ``
})
export class PropertiesPageComponent implements OnDestroy {
  public counter = signal<number>(10);
  public user = signal<User>({
    id: 1,
    email: 'brayan.alvarez@gmail.com',
    first_name: 'Brayan',
    last_name: 'Alvarez',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  })
  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`)

  public userChangedEffect = effect(() => {
    // * Este efecto se ejecutara cada vez que el valor de first_name cambie o si el contador cambia su valor
    console.log(`${this.user().first_name} - ${this.counter()}`)
  })

  ngOnDestroy(): void {
    // * Esto no es necesario porque angular implicatamente ya destruye el efecto
    // this.userChangedEffect.destroy()
  }

  onFieldUpdated(field: keyof User, value: string): void {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })

    this.user.update((currentValue) => ({
      ...currentValue,
      [field]: value
    }));

    // this.user.update((currentValue) => {

    //   switch (field) {
    //     case 'email':
    //       currentValue.email = value;
    //       break;
    //     case 'avatar':
    //       currentValue.avatar = value;
    //       break;
    //     case 'first_name':
    //       currentValue.first_name = value;
    //       break;
    //     case 'last_name':
    //       currentValue.last_name = value;
    //       break;
    //     case 'id':
    //       currentValue.id = Number(value);
    //       break;
    //     default:
    //       break;
    //   }

    //   return currentValue;
    // });
  }

  increaseBy(value: number): void {
    this.counter.update((currentValue) => currentValue + value )
  }
}
