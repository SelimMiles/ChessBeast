// =========================================================
// ChessBeast — site scripts
// =========================================================

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Knight's tour hero animation ----------
// Computes a knight's tour on an 8x8 board using Warnsdorff's rule,
// then draws it as an animated path in the hero background.
(function knightsTour() {
  const size = 8;
  const cell = 400 / size; // viewBox is 400x400
  const moves = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2]
  ];

  function inBounds(x, y) { return x >= 0 && x < size && y >= 0 && y < size; }

  function countOnwardMoves(x, y, visited) {
    let count = 0;
    for (const [dx, dy] of moves) {
      const nx = x + dx, ny = y + dy;
      if (inBounds(nx, ny) && !visited[nx][ny]) count++;
    }
    return count;
  }

  function computeTour(startX, startY) {
    const visited = Array.from({ length: size }, () => Array(size).fill(false));
    const path = [[startX, startY]];
    visited[startX][startY] = true;
    let x = startX, y = startY;

    for (let step = 1; step < size * size; step++) {
      let candidates = [];
      for (const [dx, dy] of moves) {
        const nx = x + dx, ny = y + dy;
        if (inBounds(nx, ny) && !visited[nx][ny]) {
          candidates.push([nx, ny, countOnwardMoves(nx, ny, visited)]);
        }
      }
      if (candidates.length === 0) return path; // dead end, use what we have
      candidates.sort((a, b) => a[2] - b[2]);
      const [nx, ny] = candidates[0];
      visited[nx][ny] = true;
      path.push([nx, ny]);
      x = nx; y = ny;
    }
    return path;
  }

  // Try a few starting points, keep the longest tour found.
  let bestPath = [];
  const starts = [[0, 0], [1, 2], [3, 3], [2, 5]];
  for (const [sx, sy] of starts) {
    const p = computeTour(sx, sy);
    if (p.length > bestPath.length) bestPath = p;
  }

  const points = bestPath.map(([gx, gy]) => [
    gx * cell + cell / 2,
    gy * cell + cell / 2
  ]);

  const pathEl = document.getElementById('tourPath');
  const dotEl = document.getElementById('tourDot');
  if (!pathEl || points.length === 0) return;

  const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
  pathEl.setAttribute('d', d);

  const totalLength = pathEl.getTotalLength();
  pathEl.style.strokeDasharray = totalLength;
  pathEl.style.strokeDashoffset = totalLength;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    pathEl.style.strokeDashoffset = 0;
    const last = points[points.length - 1];
    dotEl.setAttribute('cx', last[0]);
    dotEl.setAttribute('cy', last[1]);
    return;
  }

  const duration = 9000; // ms for one full draw
  let startTime = null;

  function animate(ts) {
    if (!startTime) startTime = ts;
    const elapsed = (ts - startTime) % (duration * 1.4);
    const t = Math.min(elapsed / duration, 1);

    pathEl.style.strokeDashoffset = totalLength * (1 - t);

    const point = pathEl.getPointAtLength(totalLength * t);
    dotEl.setAttribute('cx', point.x);
    dotEl.setAttribute('cy', point.y);

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ---------- Contact form ----------
// This form currently has no backend. See README.md for how to wire it
// up to Formspree, mailto, or your own endpoint.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks — this demo form isn't connected yet. See the README to hook it up to Formspree or email.";
  formNote.style.color = 'var(--gold-light)';
});
