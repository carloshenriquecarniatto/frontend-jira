import { Pipe, PipeTransform } from '@angular/core';
import Issue from '../models/Issue.model';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'filterByLabelAndDate',
})
export class FilterByLabelAndDatePipe implements PipeTransform {
  transform(
    list: Observable<Issue[]>,
    labelFilter: string,
    dateFilter: Date
  ): Observable<Issue[]> {
    let result = list.pipe(
      map((issue) =>
        issue.filter(
          (c) =>
            c.getLabels().includes(labelFilter) &&
            c.getDueDate().toDateString() === dateFilter.toDateString()
        )
      )
    );
    return result;
  }
}
