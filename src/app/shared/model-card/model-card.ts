import { Component, Input } from '@angular/core';
import { ModelResult } from '../../models/results-models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LatencyScorePipe } from '../pipes/latency-score.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-model-card',
  standalone: true,
  templateUrl: './model-card.html',
  styleUrls: ['./model-card.css'],
  imports: [CommonModule, MatCardModule, MatProgressBarModule, LatencyScorePipe, MatTooltipModule]
})
export class ModelCard {
  @Input() result!: ModelResult;

  // 🧠 Helpers to make scores more readable
  get readabilityLevel(): string {
    const score = this.result.insights?.readability ?? 0;
    if (score >= 80) return 'Easy (🟢)';
    if (score >= 60) return 'Moderate (🟡)';
    if (score > 0) return 'Complex (🔴)';
    return 'N/A';
  }

  get coherenceLevel(): string {
    const score = this.result.insights?.coherence ?? 0;
    if (score >= 0.85) return 'High (🟢)';
    if (score >= 0.65) return 'Medium (🟡)';
    if (score > 0) return 'Low (🔴)';
    return 'N/A';
  }

  // 🪙 For displaying backend-provided cost neatly
  get formattedCost(): string {
    const cost = this.result.insights?.estimatedCostUSD ?? 0;
    return cost > 0 ? `$${cost.toFixed(4)}` : 'N/A';
  }

  // 🔠 Optional convenience getters for clarity
  get tokenCount(): number | undefined {
    return this.result.insights?.tokenCount;
  }

  get wordCount(): number | undefined {
    return this.result.insights?.wordCount;
  }

  latencyCalculation(latency: number): number {
    return Math.min((1000 / latency) * 100, 100)
  }
}
