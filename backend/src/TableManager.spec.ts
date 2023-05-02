import TableManager from './TableManager';

describe('TableManager', () => {
  describe('getTable', () => {
    it('should return the table with the given name', async () => {
      const tableManager = new TableManager();
      tableManager.createTable('table-1', 2);
      const table = tableManager.getTable('table-1');

      expect(table).toEqual({ name: 'table-1', seats: [{ seatNumber: 'seat-1' }, { seatNumber: 'seat-2' }] });
    });

    it('should throw an error when table name is not found', async () => {
      const tableManager = new TableManager();
      tableManager.createTable('table-1', 2);
      tableManager.createTable('table-2', 2);

      expect(() => tableManager.getTable('table-3')).toThrowError(`table table-3 not found`);
    });
  });
});
