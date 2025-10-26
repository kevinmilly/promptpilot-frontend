import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModelResult } from '../../models/results-models';
import { SafeMultPipe } from '../pipes/safe-mult.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-model-card',
  standalone: true,
  templateUrl: './model-card.html',
  styleUrls: ['./model-card.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, ClipboardModule, MatProgressBarModule]
})
export class ModelCard {
  @Input() result!: ModelResult;

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) { }

  copyText(text: string) {
    this.clipboard.copy(text);
    this.snackBar.open('Response copied to clipboard!', '', { duration: 2000 });
  }

  providerClass(provider: string | undefined): string {
    if (!provider) return '';
    const normalized = provider.toLowerCase();
    if (normalized.includes('openai')) return 'openai';
    if (normalized.includes('anthropic')) return 'anthropic';
    if (normalized.includes('google') || normalized.includes('gemini')) return 'google';
    return '';
  }
}
