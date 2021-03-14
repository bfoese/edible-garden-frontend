import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutritionDemandPercent'
})
export class NutritionDemandPercentPipe implements PipeTransform {
  transform(value: unknown, steps: number): number {
    if (value && 'string' === typeof value) {
      switch (value) {
        case 'low':
          return this.calculatePercentage(1, steps);
        case 'moderate':
          return this.calculatePercentage(2, steps);
        case 'high':
          return this.calculatePercentage(3, steps);
      }
    }
    return 0;
  }

  private calculatePercentage(weight: number, steps: number): number {
    return Math.ceil((weight / steps) * 100);
  }
}
