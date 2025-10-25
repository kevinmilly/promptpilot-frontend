import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safeMult', standalone: true })
export class SafeMultPipe implements PipeTransform {
  transform(value: number | undefined, multiplier: number): number {
    return value ? Math.min(value * multiplier, 100) : 0;
  }
}
