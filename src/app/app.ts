import { Component } from '@angular/core';
import { HomeComponent } from './components/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  template: `<app-home />`,
  styles: []
})
export class App {}
