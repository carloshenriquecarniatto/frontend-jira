import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import Issue from '../../../models/Issue.model';

@Component({
  selector: 'app-grouped-cards',
  templateUrl: './grouped-cards.component.html',
})
export class GroupedCardsComponent implements OnInit, OnDestroy {
  @Input() labels$: Observable<string[]> = of([]);
  @Input() dates$: Observable<Date[]> = of([]);
  @Input() issues$: Observable<Issue[]> = of([]);
  private subscription = new Subscription();
  public dates: Date[] = [];
  constructor() {}

  ngOnInit(): void {
    this.subscription = this.dates$.subscribe((dates) => {
      this.dates = dates;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onDrop(event: CdkDragDrop<Issue[]>) {
    console.log(event.item.data);
  }
}
