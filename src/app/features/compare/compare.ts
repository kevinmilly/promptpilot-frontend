import { Component, Inject } from '@angular/core';
import { CompareService } from '../../core/compare-service';
import { ModelResult } from '../../models/results-models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModelCard } from '../../shared/model-card/model-card';
import { SummaryCard } from '../../shared/summary-card/summary-card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-compare',
  standalone: true,
  templateUrl: './compare.html',
  styleUrls: ['./compare.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ModelCard,
    SummaryCard,
    ClipboardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class Compare {
  prompt = '';
  results: ModelResult[] = [];
  loading = false;
  error = '';
  savedComparisons: any[] = [];
  loadingStep = 0;
  private stepInterval: any;
  showInfo = false;
  viewMode: 'full' | 'compact' = 'full';

  constructor(private compareService: CompareService, private clipboard: Clipboard,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadSavedComparisons();
  }

  onCompare() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.error = '';
    this.results = [];
    this.loadingStep = 0;
    this.animateLoadingConsole();

    this.compareService.compare(this.prompt).subscribe({
      next: (data) => {
        this.results = data || [];
        this.loading = false;
        clearInterval(this.stepInterval);
      },
      error: (err) => {
        this.error = 'Error contacting backend';
        this.loading = false;
        clearInterval(this.stepInterval);
      },
    });
  }

  // Animate step-by-step loading log
  private animateLoadingConsole() {
    this.loadingStep = 0;
    clearInterval(this.stepInterval);

    this.stepInterval = setInterval(() => {
      this.loadingStep++;
      if (this.loadingStep > 6) clearInterval(this.stepInterval);
    }, 600); // new line every 0.6s
  }

  copyAll() {
    if (!this.results?.length) return;

    const allText = this.results
      .map(
        (r) =>
          `🧠 ${r.metadata.name} (${r.metadata.provider})\n${r.text}\n\n-----------------------------\n`
      )
      .join('\n');

    this.clipboard.copy(allText);
    this.snackBar.open('All responses copied!', '', { duration: 2500 });
  }

  // Save current comparison to localStorage
  saveComparison() {
    if (!this.results?.length) return;

    const entry = {
      prompt: this.prompt,
      results: this.results,
      timestamp: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('comparisons') || '[]');
    stored.unshift(entry); // latest on top
    localStorage.setItem('comparisons', JSON.stringify(stored));

    this.snackBar.open('Comparison saved!', '', { duration: 2000 });


    this.loadSavedComparisons();
  }

  // Load from storage on init
  loadSavedComparisons() {
    this.savedComparisons = JSON.parse(localStorage.getItem('comparisons') || '[]');
  }

  // Load one comparison back into view
  loadComparison(item: any) {
    this.prompt = item.prompt;
    this.results = item.results;
  }

  // Delete one saved comparison
  deleteComparison(item: any, event: MouseEvent) {
    event.stopPropagation(); // prevent triggering load
    const filtered = this.savedComparisons.filter(i => i.timestamp !== item.timestamp);
    localStorage.setItem('comparisons', JSON.stringify(filtered));
    this.loadSavedComparisons();
  }

  // Clear all
  clearAllComparisons() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Clear all saved comparisons?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('comparisons');
        this.savedComparisons = [];
        this.snackBar.open('🗑️ All comparisons cleared.', '', { duration: 2000 });
      }
    });
  }
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancel</button>
      <button mat-flat-button color="warn" mat-dialog-close="true">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}