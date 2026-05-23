'use strict';

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const year = document.getElementById('year');
const form = document.getElementById('rideForm');
const matchesEl = document.getElementById('matches');
const resultCount = document.getElementById('resultCount');
const modal = document.getElementById('matchModal');
const modalText = document.getElementById('modalText');
const matchCode = document.getElementById('matchCode');
const openDemoButtons = document.querySelectorAll('[data-open-demo]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

year.textContent = new Date().getFullYear();

let currentMatches = [];

const sampleMatches = [
  { name: 'Amara N.', route: 'Windsor to Toronto', rating: 4.9, time: 'Leaves in 28 min', seats: 2, price: 48, score: 96, note: 'Pickup is 1.8 km from your current location.' },
  { name: 'Daniel K.', route: 'Windsor to Mississauga', rating: 4.8, time: 'Leaves in 44 min', seats: 1, price: 42, score: 91, note: 'Destination is close to your selected drop-off.' },
  { name: 'Priya S.', route: 'LaSalle to Toronto', rating: 5.0, time: 'Leaves in 1 hr 10 min', seats: 3, price: 54, score: 88, note: 'Slight pickup detour, strong safety profile.' }
];

function toggleNav() {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function renderMatches(matches) {
  resultCount.textContent = `${matches.length} found`;
  matchesEl.innerHTML = matches.map((match, index) => `
    <article class="match-card">
      <div>
        <h4>${escapeHtml(match.name)} • ${escapeHtml(match.route)}</h4>
        <p>${escapeHtml(match.note)}</p>
        <div class="match-meta">
          <span class="pill">${escapeHtml(match.time)}</span>
          <span class="pill">${match.seats} seat${match.seats === 1 ? '' : 's'}</span>
          <span class="pill">${match.rating}★ rating</span>
          <span class="pill">${match.score}% fit</span>
        </div>
      </div>
      <div class="book-side">
        <div class="price">$${match.price}</div>
        <button class="btn btn-small" data-book-index="${index}">Select</button>
      </div>
    </article>
  `).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function openBookingModal(match) {
  const code = Math.floor(1000 + Math.random() * 9000);
  matchCode.textContent = String(code);
  modalText.textContent = `${match.name} is ready to confirm your ${match.route} ride. Share this code at pickup.`;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

navToggle.addEventListener('click', toggleNav);

openDemoButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

closeModalButtons.forEach(button => button.addEventListener('click', closeModal));
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const price = Number(document.getElementById('price').value || 48);
  const seats = Number(document.getElementById('seats').value || 2);
  const role = document.getElementById('role').value;

  const adjustedMatches = sampleMatches.map((match, index) => ({
    ...match,
    route: `${origin} to ${destination}`,
    price: Math.max(8, price + (index * 6) - 4),
    seats: role === 'driver' ? Math.max(1, seats - index) : match.seats,
    score: Math.max(78, match.score - index * 3)
  }));

  currentMatches = adjustedMatches;
  renderMatches(currentMatches);
});

matchesEl.addEventListener('click', event => {
  const button = event.target.closest('[data-book-index]');
  if (!button) return;
  const index = Number(button.dataset.bookIndex);
  openBookingModal(currentMatches[index]);
});

currentMatches = sampleMatches;
renderMatches(currentMatches);
