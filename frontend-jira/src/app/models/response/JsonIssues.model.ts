export interface JsonIssues {
  total: number;
  issues: issue[];
}

export interface issue {
  key: string;
  fields: Fields;
  renderedFields: RenderedFields;
}

export interface Fields {
  labels: string[];
  created: Date;
  issuetype: Issuetype;
  duedate: string;
  timeestimate?: number;
  description?: string;
}

export interface RenderedFields {
  summary: string;
  duedate: string;
  timetracking: Timetracking;
}

export interface Timetracking {
  originalEstimateSeconds: number;
}

interface Issuetype {
  id: string;
  description: string;
  name: string;
  iconUrl: string;
}
