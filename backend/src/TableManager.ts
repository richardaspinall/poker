import Table from './Table';
import { Server as IOServer, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './shared/WebSocketEvents';

export default class TableManager {
  private tables: Table[];
  private io: IOServer<ClientToServerEvents, ServerToClientEvents> | undefined;

  constructor() {
    this.tables = [];
  }

  public setIoServer(io: IOServer<ClientToServerEvents, ServerToClientEvents>) {
    this.io = io;
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

  // Emits an event and arguments to a room
  public emitToUser(socketId: string, event: any, args: any) {
    const hand = args.hand;
    const dealtInPlayers = args.dealtInPlayers;
    if (this.io) {
      this.io.to(socketId).emit(event, hand, dealtInPlayers);
    }
  }

  public emitToTable(tableName: string, event: any, args: any) {
    // Let the table know that someone has seated
    const seatNumber = args.seatNumber;
    if (this.io) {
      this.io.to(tableName).emit(event, seatNumber);
    }
  }
}

const tableManager = new TableManager();
tableManager.createTable('table-1', 2);

export { tableManager };
