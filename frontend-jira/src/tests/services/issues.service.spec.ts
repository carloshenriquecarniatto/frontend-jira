import { IssuesService } from './../../app/services/issues.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { getIssuesTest } from '../test-utils-functions';

describe('Services => Issue', () => {
  let injector: TestBed;
  let service: IssuesService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssuesService],
    });
    injector = getTestBed();
    service = injector.get(IssuesService);
    httpMock = injector.get(HttpTestingController);
    let result = await getIssuesTest();
    let labeslResult = ['Roadmap', 'Bug', 'Feature', 'Epic', 'Story'];
    spyOn(service, 'getIssues').and.returnValue(of(result));
    spyOn(service, 'getLabels').and.returnValue(of(labeslResult));
  });
  it('should return an Observable<Issues[]> not null', (done) => {
    service.getIssues().subscribe((data) => {
      expect(data).not.toBeNull();
      done();
    });
  });
  it('should return an Issues has elements inside', (done) => {
    service.getIssues().subscribe((data) => {
      expect(data.length).not.toEqual(0);
      done();
    });
  });
  it('should return an Observable<string[]> length equals 5 when the filter is All', (done) => {
    service.getLabels('All').subscribe((data) => {
      expect(data.length).toEqual(5);
      done();
    });
  });
});
