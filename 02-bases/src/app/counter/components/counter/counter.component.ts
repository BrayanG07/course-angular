import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h3>Counter: {{ counter }}</h3>
    <button class="btn btn-primary mx-1" (click)="incrementBy(+1)">+1</button>
    <button class="btn btn-primary mx-1" (click)="incrementBy(-1)">-1</button>
    <button class="btn btn-primary mx-1" (click)="resetCounter()">Reset</button>
  `,
})
export class CounterComponent {
  private initialValue: number = 10;
  public counter: number = this.initialValue;

  constructor() {}

  incrementBy(value: number = 1): void {
    this.counter += value;
  }

  resetCounter(): void {
    this.counter = this.initialValue;
  }
}
