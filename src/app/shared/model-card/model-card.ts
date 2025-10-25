import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModelResult } from '../../models/results-models';
import { SafeMultPipe } from '../pipes/safe-mult.pipe';

@Component({
  selector: 'app-model-card',
  standalone: true,
  templateUrl: './model-card.html',
  styleUrls: ['./model-card.css'],
  imports: [CommonModule, MatCardModule, MatProgressBarModule]
})
export class ModelCard {
  @Input() result!: ModelResult;

  providerClass(provider: string | undefined): string {
    if (!provider) return '';
    const normalized = provider.toLowerCase();
    if (normalized.includes('openai')) return 'openai';
    if (normalized.includes('anthropic')) return 'anthropic';
    if (normalized.includes('google') || normalized.includes('gemini')) return 'google';
    return '';
  }
}
