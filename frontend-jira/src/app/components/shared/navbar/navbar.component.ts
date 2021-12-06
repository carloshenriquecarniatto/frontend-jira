import { Component, OnInit } from '@angular/core';
import {
  faFilter,
  faTrash,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { IssuesService } from 'src/app/services/issues.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public labels$: Observable<string[]> = of([]);
  public visible = 'invisible';
  public labelFilter = 'Roadmap';
  filterIcon = faFilter;
  trashIcon = faTrash;
  constructor(private service: IssuesService) {}
  ngOnInit(): void {
    this.labels$ = this.service.getLabels('All');
  }

  setLabelFilter(label: string) {
    this.labelFilter = label;
    this.service.setFilter(label);
  }

  showMenu() {
    if (this.visible === 'invisible') {
      this.visible = 'visible';
    } else {
      this.visible = 'invisible';
    }
  }

  removeFilter() {
    this.labelFilter = 'Roadmap';
    this.service.setFilter(this.labelFilter);
  }
}
