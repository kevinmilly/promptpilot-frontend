import { Component } from '@angular/core';
import { Compare } from './features/compare/compare';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Compare],
  template: `
    <main>
      <h1 class="app-title">PromptPilot 🚀</h1>
      <app-compare></app-compare>
    </main>
  `,
  styles: [
    `
      main {
        max-width: 900px;
        margin: 2rem auto;
      }
      .app-title {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class App {}
