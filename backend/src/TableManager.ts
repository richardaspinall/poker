import Table from './Table';
export default class TableManager {
  private tables: Table[];

  constructor() {
    this.tables = [];
  }

  public createTable(name: string, numSeats: number): void {
    this.tables.push(new Table(name, numSeats));
  }

  public getTable(name: string) {
    const table = this.tables.find((table) => table.getName() === name);

    if (!table) {
      throw new Error(`table ${name} not found`);
    }
    return table;
  }
}
