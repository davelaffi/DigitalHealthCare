import { Pipe, PipeTransform } from '@angular/core';
import { MedicoProfile } from '../models/medico_profile';
import { VolunteerProfile } from '../models/volunteer_profile';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {boolean} showAll
   * @param {MedicoProfile|VolunteerProfile} currentUser
   * @returns {any[]}
   */
  transform(items: any[], searchText: string, showAll: boolean, currentUser: MedicoProfile | VolunteerProfile): any[] {


    if (!items) {
      return [];
    }

    if (!showAll) {

      if (currentUser.userType == "medico") {
        items = items.filter(it => {

          return it.CFMedico == currentUser.CF;
        })
      }

      else if (currentUser.userType == "volontario") {
        items = items.filter(it => {

          return it.CFVolontario == currentUser.CF;
        })
      }

      if (!searchText) {
        return items;
      }

    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return (it.nome + " " + it.cognome + " " + it.CF).toLocaleLowerCase().includes(searchText);
    });
  }
}