import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing {
  constructor(private router: Router) { }

  goToCompare() {
    this.router.navigate(['/compare']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  scrollToFeatures() {
    const el = document.getElementById('features');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
