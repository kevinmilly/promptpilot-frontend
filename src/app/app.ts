import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisclaimerDialog } from './shared/disclaimer-dialog/disclaimer-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.autoOpenDisclaimer();
  }

  openDisclaimer() {
    this.dialog.open(DisclaimerDialog, {
      width: '480px',
    });
  }

  private autoOpenDisclaimer() {
    const seen = localStorage.getItem('disclaimerSeen');
    if (!seen) {
      // Wait a brief moment so it feels intentional
      setTimeout(() => {
        const dialogRef = this.dialog.open(DisclaimerDialog, {
          width: '480px',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe(() => {
          localStorage.setItem('disclaimerSeen', 'true');
        });
      }, 600);
    }
  }
}
