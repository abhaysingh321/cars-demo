// ==========================================================================
// PURE JAVASCRIPT STATE MANAGEMENT (ZERO THIRD-PARTY LIBRARIES)
// ==========================================================================

// Global Showroom State
const state = {
  currentColorHex: '#ff1e27',
  currentColorName: 'Supersonic Red',
  currentAngle: 'side' // 'front', 'side', or 'rear'
};

// DOM Elements
const svgContainer = document.getElementById('car-svg-container');
const colorNameDisplay = document.getElementById('color-name-display');
const toastEl = document.getElementById('toast');

// Pure SVG Car Vector Generators (Self-Contained)
function generateCarSVG(colorHex, angle) {
  if (angle === 'front') {
    return `
      <svg viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="250" cy="220" rx="200" ry="15" fill="rgba(0,0,0,0.6)" />
        <!-- Windshield -->
        <path d="M150 110 L200 65 L300 65 L350 110 Z" fill="#1f242d" stroke="#3a4150" stroke-width="3"/>
        <!-- Roof -->
        <path d="M195 65 Q250 60 305 65" stroke="#ffffff" stroke-width="2" fill="none"/>
        <!-- Car Main Body -->
        <path d="M80 160 Q80 125 130 115 L370 115 Q420 125 420 160 L410 190 Q400 200 380 200 L120 200 Q100 200 90 190 Z" fill="${colorHex}" stroke="#222" stroke-width="3"/>
        <!-- Hood Lines -->
        <path d="M160 115 L190 160 M340 115 L310 160" stroke="rgba(0,0,0,0.3)" stroke-width="3"/>
        <!-- Headlights -->
        <polygon points="100,140 160,145 150,165 95,155" fill="#e0f7fa" stroke="#ff1e27" stroke-width="2"/>
        <polygon points="400,140 340,145 350,165 405,155" fill="#e0f7fa" stroke="#ff1e27" stroke-width="2"/>
        <!-- Grille -->
        <rect x="180" y="150" width="140" height="35" rx="5" fill="#111" stroke="#333" stroke-width="2"/>
        <!-- Front Emblem -->
        <circle cx="250" cy="162" r="8" fill="none" stroke="#fff" stroke-width="2"/>
      </svg>
    `;
  } else if (angle === 'rear') {
    return `
      <svg viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="250" cy="220" rx="200" ry="15" fill="rgba(0,0,0,0.6)" />
        <!-- Rear Glass -->
        <path d="M160 110 L205 70 L295 70 L340 110 Z" fill="#1f242d" stroke="#3a4150" stroke-width="3"/>
        <!-- Car Main Body -->
        <path d="M80 160 Q80 125 130 115 L370 115 Q420 125 420 160 L410 190 Q400 200 380 200 L120 200 Q100 200 90 190 Z" fill="${colorHex}" stroke="#222" stroke-width="3"/>
        <!-- Taillights (Red Lightbar) -->
        <path d="M95 145 L405 145 L400 160 L100 160 Z" fill="#ff1e27" stroke="#b71c1c" stroke-width="2"/>
        <!-- License Plate Area -->
        <rect x="200" y="165" width="100" height="20" rx="3" fill="#111" stroke="#333"/>
        <!-- Exhaust Pipes -->
        <circle cx="130" cy="195" r="7" fill="#555" stroke="#222" stroke-width="2"/>
        <circle cx="150" cy="195" r="7" fill="#555" stroke="#222" stroke-width="2"/>
        <circle cx="350" cy="195" r="7" fill="#555" stroke="#222" stroke-width="2"/>
        <circle cx="370" cy="195" r="7" fill="#555" stroke="#222" stroke-width="2"/>
      </svg>
    `;
  } else {
    // Side Angle (Default)
    return `
      <svg viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="250" cy="215" rx="220" ry="12" fill="rgba(0,0,0,0.6)" />
        <!-- Wheels -->
        <circle cx="120" cy="180" r="38" fill="#111" stroke="#444" stroke-width="6"/>
        <circle cx="120" cy="180" r="20" fill="#222" stroke="#ff1e27" stroke-width="3"/>
        <circle cx="380" cy="180" r="38" fill="#111" stroke="#444" stroke-width="6"/>
        <circle cx="380" cy="180" r="20" fill="#222" stroke="#ff1e27" stroke-width="3"/>
        <!-- Body Shell -->
        <path d="M30 170 Q40 140 90 135 L170 120 L240 75 L350 75 L430 130 L470 150 Q480 170 460 180 L420 180 Q410 150 380 150 Q350 150 340 180 L160 180 Q150 150 120 150 Q90 150 80 180 L50 180 Z" fill="${colorHex}" stroke="#111" stroke-width="3"/>
        <!-- Windows -->
        <path d="M180 120 L245 83 L340 83 L380 120 Z" fill="#1f242d" stroke="#3a4150" stroke-width="2"/>
        <!-- Side Door Accent Line -->
        <path d="M140 140 L330 140 M220 120 L210 175" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
      </svg>
    `;
  }
}

// Render UI Update
function updateShowroom() {
  // Inject generated vector car
  svgContainer.innerHTML = generateCarSVG(state.currentColorHex, state.currentAngle);
  colorNameDisplay.innerText = state.currentColorName;
}

// Toast Notification
function showToast(message) {
  toastEl.innerText = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  updateShowroom();

  // Color Swatch Clicks
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      e.target.classList.add('active');

      state.currentColorHex = e.target.getAttribute('data-hex');
      state.currentColorName = e.target.getAttribute('data-name');
      updateShowroom();
    });
  });

  // Angle Button Clicks
  document.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      state.currentAngle = e.target.getAttribute('data-angle');
      updateShowroom();
    });
  });

  // Action Buttons
  document.getElementById('book-drive-btn').addEventListener('click', () => {
    showToast('Test Drive Reserved! Our team will contact you.');
  });

  document.getElementById('reserve-btn').addEventListener('click', () => {
    showToast(`Vehicle reserved in ${state.currentColorName}!`);
  });

  document.getElementById('explore-btn').addEventListener('click', () => {
    document.getElementById('showroom').scrollIntoView({ behavior: 'smooth' });
  });
});