import { Component, OnInit, OnDestroy } from '@angular/core';
import Issue from '../../models/Issue.model';
import { IssuesService } from 'src/app/services/issues.service';
import { Observable, of, catchError, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-jira-viewer',
  templateUrl: './jira-viewer.component.html',
})
export class JiraViewerComponent implements OnInit {
  public issues$: Observable<Issue[]> = of([]);
  public dates$: Observable<Date[]> = of([]);
  public labels$: Observable<string[]> = of([]);
  public errorMessage: string = '';

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.issuesService.getFilter().subscribe((filter) => {
      this.labels$ = this.issuesService.getLabels(filter);
      this.dates$ = this.issuesService.getDatesLabels(filter).pipe(
        map((dates) => {
          return dates.filter(
            (date) =>
              date.toDateString() !=
              new Date(
                'Thu Jan 01 1970 01:00:00 GMT+0100 (Horário Padrão da Europa Central)'
              ).toDateString()
          );
        }),
        map((dates) => {
          return dates.sort(function (a, b) {
            return a.getTime() - b.getTime();
          });
        })
      );
      this.issues$ = this.issuesService.getIssues().pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return of([]);
        })
      );
    });
  }
}
