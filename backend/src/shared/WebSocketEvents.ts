// These are all the event types that can be passed between the client and the server

export interface ClientToServerEvents {
  hello_from_client: () => void;
  player_viewing: () => void;
  player_ready: (tableName: string) => void;
  player_sits: (seatNumber: string) => void;
  player_stands: (seatNumber: string) => void;
  player_folds: () => void;
  player_checks: () => void;
  player_calls: () => void;
  player_raises: () => void;
  game_start: (holeCards: string, dealtInPlayers: any) => void;
}

export interface ServerToClientEvents {
  hello_from_server: () => void;
  player_sits: (seatNumber: string) => void;
  player_stands: (seatNumber: string) => void;
  player_folds: (seatNumber: string) => void;
  player_checks: (seatNumber: string) => void;
  player_calls: (seatNumber: string) => void;
  player_raises: (seatNumber: string) => void;
  game_start: (holeCards: string, dealtInPlayers: any) => void;
}
