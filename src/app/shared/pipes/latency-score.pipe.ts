import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latencyScore',
  standalone: true,
})
export class LatencyScorePipe implements PipeTransform {
  transform(latency: number): number {
    if (!latency || latency <= 0) return 0;

    // Compute a capped “speed score” between 0 and 100.
    // Lower latency = higher score.
    const score = (1000 / latency) * 100;

    // Cap between 0 and 100 for the progress bar.
    return Math.min(score, 100);
  }
}
