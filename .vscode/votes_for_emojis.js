const locations = [
  { name: 'Waffle House', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Topgolf', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Ponce City Market', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'SkyView Atlanta (Ferris Wheel)', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'The Battery Atlanta', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Atlanta BeltLine', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'High Museum of Art', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Georgia Aquarium', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'The Painted Duck', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Krog Street Market', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Six Flags Over Georgia', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Andretti Indoor Karting & Games', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Slutty Vegan', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Stone Mountain Park', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'The Vortex Bar & Grill', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Lenox Square Mall', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Piedmont Park', votes: { yes: 0, maybe: 0, no: 0 } },
  { name: 'Joystick Gamebar', votes: { yes: 0, maybe: 0, no: 0 } }
];

const locationsDiv = document.getElementById('locations');
const winnerDiv = document.getElementById('winner');

function renderCards() {
  locationsDiv.innerHTML = '';

  locations.forEach((location, index) => {
    const { yes, maybe, no } = location.votes;

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${location.name}</h3>
      <div>
        <span class="emoji" onclick="vote(${index}, 'yes')">🔥</span>
        <span class="emoji" onclick="vote(${index}, 'maybe')">🤔</span>
        <span class="emoji" onclick="vote(${index}, 'no')">❌</span>
      </div>
      <div class="votes">
        🔥 Yes: ${yes} |
        🤔 Maybe: ${maybe} |
        ❌ No: ${no}
      </div>
    `;

    locationsDiv.appendChild(card);
  });

  updateWinner();
}

function vote(index, type) {
  locations[index].votes[type]++;
  renderCards();
}

function updateWinner() {
  const maxYesVotes = Math.max(...locations.map(l => l.votes.yes));
  const winners = locations.filter(l => l.votes.yes === maxYesVotes && maxYesVotes > 0);

  if (winners.length > 0) {
    winnerDiv.textContent = `🏆 Current Leader: ${winners.map(w => w.name).join(', ')} (${maxYesVotes} 🔥 votes)`;
  } else {
    winnerDiv.textContent = '';
  }
}

renderCards();
