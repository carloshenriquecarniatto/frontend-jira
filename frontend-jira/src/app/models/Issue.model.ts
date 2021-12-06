export default class Issue {
  constructor(
    private key: string,
    private summary: string,
    private description: string,
    public labels: string[],
    private issuetype: string,
    private issueIcon: string,
    public duedate: Date,
    private timeoriginalestimate: number
  ) {}
  getKey(): string {
    return this.key;
  }
  getSummary() {
    return this.summary;
  }

  getDescription() {
    return this.description;
  }

  getLabels() {
    return this.labels ?? [];
  }
  getEstimationInDays() {
    return this.timeoriginalestimate / 86400;
  }

  public getDueDate(): Date {
    return this.duedate;
  }
  getIssueType() {
    return this.issuetype;
  }
  getIssueIcon() {
    return this.issueIcon;
  }
}
