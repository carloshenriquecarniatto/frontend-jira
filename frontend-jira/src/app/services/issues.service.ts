import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  map,
  Observable,
  groupBy,
  reduce,
  BehaviorSubject,
  shareReplay,
} from 'rxjs';
import Issue from '../models/Issue.model';
import { issue } from '../models/response/JsonIssues.model';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private readonly url = 'https://pinguintest.atlassian.net/rest/api/2';
  private filterBehavior = new BehaviorSubject<string>('Roadmap');
  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http
      .get<any>(
        `${this.url}/search?fields=*all&expand=renderedFields,renderedBody`,
        this.composeHeaders()
      )
      .pipe(
        shareReplay(1),
        map((response) => {
          return response.issues.map((issue: issue) => {
            if (issue.renderedFields.duedate || issue.fields.duedate) {
              return new Issue(
                issue.key,
                issue.renderedFields?.summary ?? '',
                issue.fields?.description ?? '',
                issue.fields?.labels ?? [],
                issue.fields?.issuetype?.name ?? '',
                issue.fields.issuetype.iconUrl,
                new Date(issue.renderedFields.duedate),
                issue.renderedFields?.timetracking.originalEstimateSeconds ?? 0
              );
            }
            return null;
          });
        }),
        map((issues) => issues.filter((issue: Issue) => issue != null))
      );
  }

  getLabels(filter: string): Observable<string[]> {
    return this.http.get<any>(`${this.url}/label`, this.composeHeaders()).pipe(
      shareReplay(1),
      map((response) => {
        return response.values.map((label: string) => label);
      }),
      map((labels: string[]) => {
        if (filter === 'All') {
          return labels;
        } else {
          return labels.filter((label: string) => label === filter);
        }
      })
    );
  }

  getDatesLabels(filter: string): Observable<Date[]> {
    return this.getIssues().pipe(
      shareReplay(1),
      map((issue) => {
        return filter === 'All'
          ? issue
          : issue.filter((label) => label.getLabels().includes(filter));
      }),
      map((issue) => issue.map((label) => label.getDueDate())),
      groupBy((issue) => issue),
      map((group) => group.key),
      reduce((acc, curr) => [...new Set([...acc, ...curr])])
    );
  }

  setFilter(labelFilter: string) {
    this.filterBehavior.next(labelFilter);
  }
  getFilter() {
    return this.filterBehavior.asObservable();
  }

  private composeHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization:
          'Basic ' + btoa('ilikepengus.r@gmail.com:be3YPsPJWzh3PHws2EqAEC99'),
      }),
    };
  }
}
