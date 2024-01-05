import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string,
  route: string,
}

@Component({
  selector: 'signals-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  // public menuItem: MenuItem[] = [
  //   {
  //     title: 'Contador',
  //     route: 'counter'
  //   },
  //   {
  //     title: 'Usuario',
  //     route: 'user-info'
  //   },
  //   {
  //     title: 'Mutaciones',
  //     route: 'properties'
  //   },
  // ]

  public menuItems = signal<MenuItem[]>([
    {
      title: 'Contador',
      route: 'counter'
    },
    {
      title: 'Usuario',
      route: 'user-info'
    },
    {
      title: 'Mutaciones',
      route: 'properties'
    },
  ])
}
