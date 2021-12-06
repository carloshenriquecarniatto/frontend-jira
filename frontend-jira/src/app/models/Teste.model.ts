export default class Teste {
  constructor(
    private key: string,
    private summary: string,
    private labels: string[],
    private issuetype: string,
    private timespent: any,
    private timeestimate?: number,
    private duedate?: string,
    private timeoriginalestimate?: number,
    private description?: string
  ) {}
}
