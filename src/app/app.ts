import { Component } from '@angular/core';
import { Compare } from './features/compare/compare';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Compare],
  templateUrl: './compare.html',
  styleUrls: ['./compare.css'],
})
export class App { }
