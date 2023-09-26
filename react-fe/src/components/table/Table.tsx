import './Table.css';
type Props = {
  tableName: string;
};

export default function Table({ tableName }: Props) {
  return (
    <>
      <h1>{tableName}</h1>
      <div id="table">
        <div id="pot" data-chip-count="0">
          Pot
        </div>

        <div id="board-area">
          <div id="flop-area"></div>
          <div className="vl"></div>
          <div id="turn-area"></div>
          <div className="vl"></div>
          <div id="river-area"></div>
        </div>

        <div className="seat" id="seat-1" data-chip-count="0">
          Empty
          <div id="dealer-indicator">B</div>
        </div>
        <div className="seat" id="seat-2" data-chip-count="0">
          Empty
        </div>
      </div>
      <div id="player-actions">
        <div className="slidecontainer">
          <input type="range" min="0" max="10000" value="1000" className="slider" id="myRange"></input>
          <input id="bet-input" value="1000"></input>
        </div>
        <div>
          <button className="action-buttons" id="fold-action-button">
            Fold
          </button>
          <button className="action-buttons" id="check-action-button">
            Check
          </button>
          <button className="action-buttons" id="call-action-button">
            Call
          </button>
          <button className="action-buttons" id="raise-action-button">
            Bet
          </button>
          <button className="action-buttons" id="leave-table-button">
            Leave
          </button>
        </div>

        <button id="im-ready-button">I'm ready</button>
      </div>
    </>
  );
}
