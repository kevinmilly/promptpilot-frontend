import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ModelResult } from '../../models/results-models';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  templateUrl: './summary-card.html',
  styleUrls: ['./summary-card.css'],
  imports: [CommonModule, MatCardModule],
})
export class SummaryCard implements OnChanges {
  @Input() results: ModelResult[] = [];

  fastestModel?: string;
  mostReadable?: string;
  mostCoherent?: string;
  cheapestModel?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.results?.length) {
      this.computeSummary();
    }
  }

  private computeSummary() {
    const valid = this.results.filter((r) => !!r.insights);

    this.fastestModel = this.getBest(valid, 'latency', false);
    this.mostReadable = this.getBest(valid, 'readability', true);
    this.mostCoherent = this.getBest(valid, 'coherence', true);
    this.cheapestModel = this.getBest(valid, 'estimatedCostUSD', false);
  }

  private getBest(results: ModelResult[], key: keyof any, higherIsBetter: boolean): string {
    if (!results.length) return 'N/A';

    const sorted = [...results].sort((a, b) => {
      const aVal = this.resolveKey(a, key);
      const bVal = this.resolveKey(b, key);
      return higherIsBetter ? bVal - aVal : aVal - bVal;
    });

    return sorted[0]?.metadata?.name || 'N/A';
  }

  private resolveKey(result: ModelResult, key: keyof any): number {
    const insights = result.insights ?? {};
    const topLevel = (result as any)[key];
    const nested = (insights as any)[key];

    if (typeof nested === 'number') return nested;
    if (typeof topLevel === 'number') return topLevel;
    return Infinity;
  }

}
