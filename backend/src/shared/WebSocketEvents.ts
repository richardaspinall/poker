// These are all the event types that can be passed between the client and the server

export interface ClientToServerEvents {
  hello_from_client: () => void;
  onPlayerView: () => void;
  onPlayerSit: (seatNumber: string) => void;
  onPlayerStand: (seatNumber: string) => void;
  onPlayerFold: () => void;
  onPlayerCheck: () => void;
  onPlayerCall: () => void;
  onPlayerRaise: () => void;
  game_start: (holeCards: string, dealtInPlayers: any) => void;
  create_something: (value, callback) => void;
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
