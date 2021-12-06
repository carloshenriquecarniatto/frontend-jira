import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
})
export class ItemCardsComponent implements OnInit {
  @Input() issue: any;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  getIssueWith(): number {
    let issueEstimationInDays = this.issue?.getEstimationInDays();
    if (issueEstimationInDays < 1) {
      return 20;
    }
    return issueEstimationInDays * 10;
  }
  getIconSvg() {
    let result = this.sanitizer.bypassSecurityTrustHtml(
      this.issue.getIssueIcon()
    );
    return result;
  }
}
