import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styles: ``
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  price: number = 0;
  public intervalSubscription?: Subscription;


  ngOnInit(): void {
    console.log('PriceComponent - ngOnInit');
    this.intervalSubscription = interval(1000).subscribe(value => console.log(`Tick : ${value}`))

    // window.addEventListener('', () => console.log('Blur Evento'))
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceComponent - ngOnChanges');
    console.log(changes)
  }

  ngOnDestroy(): void {
    console.log('PriceComponent - ngOnDestroy');
    this.intervalSubscription?.unsubscribe();

    // window.removeEventListener('', () => console.log('Removiendo Blur'));
  }
}
