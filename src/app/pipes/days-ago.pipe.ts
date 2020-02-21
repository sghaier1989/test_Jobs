import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, formatDistance, subDays } from 'date-fns';
import  * as frLocale from 'date-fns/locale/fr';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return formatDistance(subDays(new Date(value), 3), new Date());
  }

}
