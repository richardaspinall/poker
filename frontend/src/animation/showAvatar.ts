export function showAvatar(seatNumber: string) {
  const seat = document.getElementById(seatNumber);
  if (seat) {
    seat.innerHTML = `
            <div class="player">
                <div class="head"></div>
                <div class="body"></div>
            </div>
            <div class="hole-cards">
                <div class="card-1"></div>
                <div class="card-2"></div>
            </div>
            `;
  }
}
