import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disclaimer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Disclaimer</h2>
    <mat-dialog-content>
      <p>
        This tool displays AI model outputs for educational and personal research
        purposes only. No performance benchmarking, model ranking, or
        competitive analysis is intended or implied.
      </p>
      <p>
        Results are generated dynamically using third-party APIs. Responses are
        not stored, redistributed, or used for automated evaluation beyond the
        user's current session.
      </p>
      <p>
        By using this tool, you acknowledge that each model’s respective Terms
        of Service apply when interacting with their APIs.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" mat-dialog-close>Got it</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        font-size: 0.95rem;
        line-height: 1.5;
      }
      h2 {
        margin-bottom: 0.5rem;
      }
      p {
        margin-bottom: 0.75rem;
      }
    `,
  ],
})
export class DisclaimerDialog {}
