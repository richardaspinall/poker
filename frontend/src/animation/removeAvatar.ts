export function removeAvatar(seatNumber: string) {
  const seat = document.getElementById(seatNumber);

  if (seat) {
    seat.innerHTML = `Empty`;
  }
}
