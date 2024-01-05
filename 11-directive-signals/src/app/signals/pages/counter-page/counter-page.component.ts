import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styles: ``
})
export class CounterPageComponent {
  public counter = signal(10);

  // * computed = es de solo lectura, este elemento no se puede mutar. La unica forma que su valor cambiar
  // * es cuando los signal que utilizan tienen algun cambio
  public squareCounter = computed(() => this.counter() * this.counter())

  increseBy(value: number) {
    // * currentValue = valor actual del signal
    this.counter.update((currentValue: number) => currentValue + value)
  }
}
