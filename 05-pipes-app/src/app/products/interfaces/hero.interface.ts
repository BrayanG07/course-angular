export enum Color {
  black, red, blue, green
}

export interface Hero {
  name: string;
  canFly: boolean;
  color: Color;
}
