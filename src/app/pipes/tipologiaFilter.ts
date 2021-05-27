import { Pipe, PipeTransform } from '@angular/core';
import { CovidReport } from '../models/covid_report';

@Pipe({ name: 'tipologiaFilter' })
export class TipologiaFilter implements PipeTransform {
  /**
   * Transform
   *
   * @param {CovidReport[]} items
   * @param {string} tipologia
   * @returns {any[]}
   */
  transform(items: CovidReport[], tipologia: string): any[] {
    if (!items) {
      return [];
    }
    if (!tipologia) {
      return items;
    }
    tipologia = tipologia.toLocaleLowerCase();

    return items.filter(it => {
        
        return (it.tipologia).toLocaleLowerCase().match(tipologia);
    });
  }
}