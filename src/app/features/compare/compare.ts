import { Component } from '@angular/core';
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
    SummaryCard
  ]
})
export class Compare {
  prompt = '';
  results: ModelResult[] = [];
  loading = false;
  error = '';

  constructor(private compareService: CompareService) { }

  onCompare() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.error = '';
    this.results = [];

    this.compareService.compare(this.prompt).subscribe({
      next: (data) => {
        this.results = data || [];
        this.loading = false;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error contacting backend';
        this.loading = false;
      },
    });
  }
}
