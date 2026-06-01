// Anthropic-branded progress animation with Claude-like behavior
let progress = 0;
let animationFrame = null;
let currentSpeed = 0.25;
let targetSpeed = 0.25;

const beamFill = document.querySelector('.beam-fill');
const beamTitle = document.querySelector('.beam-title');
const beamStatus = document.querySelector('.beam-status');
const beamPercentage = document.querySelector('.beam-percentage');
const anthropicBeam = document.querySelector('.anthropic-beam');
const anthropicLogo = document.querySelector('.anthropic-logo');

// Speed profiles for realistic AI processing
const speedProfiles = [
    { speed: 0.06, duration: 1600 },  // Very slow - deep analysis
    { speed: 0.18, duration: 1100 },  // Slow - careful processing
    { speed: 0.85, duration: 500 },   // Fast burst - quick retrieval
    { speed: 0.02, duration: 2000 },  // Almost stopped - contemplating
    { speed: 0.45, duration: 800 },   // Medium speed
    { speed: 0.1, duration: 1300 },   // Slow crawl
    { speed: 1.1, duration: 350 },    // Very fast
    { speed: 0.3, duration: 900 },    // Medium-slow
];

let nextSpeedChange = Date.now() + 1000;
let currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];

// Claude-style thinking messages
const thinkingMessages = [
    "Claude is thinking",
    "Claude is analyzing",
    "Claude is processing",
    "Claude is understanding",
    "Claude is generating"
];

const statusMessages = [
    "Processing your request",
    "Analyzing the context",
    "Understanding the query",
    "Formulating response",
    "Generating insights"
];

let currentMessageIndex = 0;
let nextMessageChange = Date.now() + 3000;

function animate() {
    // Change speed randomly for realistic processing
    if (Date.now() > nextSpeedChange && progress < 94) {
        currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];
        targetSpeed = currentProfile.speed;
        nextSpeedChange = Date.now() + currentProfile.duration + (Math.random() * 500);
    }

    // Update messages periodically
    if (Date.now() > nextMessageChange && progress < 85) {
        currentMessageIndex = (currentMessageIndex + 1) % thinkingMessages.length;
        beamTitle.textContent = thinkingMessages[currentMessageIndex];
        beamStatus.textContent = statusMessages[currentMessageIndex];
        nextMessageChange = Date.now() + 2500 + (Math.random() * 1500);
    }

    // Smooth speed transitions
    const speedDiff = targetSpeed - currentSpeed;
    currentSpeed += speedDiff * 0.07;

    // Update progress
    if (progress < 100) {
        progress += currentSpeed;

        // Natural slowdown near completion
        if (progress > 87) {
            currentSpeed *= 0.94;
        }

        if (progress >= 100) {
            progress = 100;
            completeAnimation();
        }

        updateUI();
    }

    animationFrame = requestAnimationFrame(animate);
}

function updateUI() {
    const percentage = Math.floor(progress);
    beamFill.style.width = `${progress}%`;
    beamPercentage.textContent = `${percentage}%`;

    // Update ARIA for accessibility
    anthropicBeam.setAttribute('aria-valuenow', percentage);

    // Logo pulses faster during rapid processing
    if (currentSpeed > 0.6) {
        anthropicLogo.classList.add('fast-pulse');
    } else {
        anthropicLogo.classList.remove('fast-pulse');
    }
}

function completeAnimation() {
    cancelAnimationFrame(animationFrame);
    beamTitle.textContent = "Claude has finished";
    beamStatus.textContent = "Response ready";
    anthropicBeam.classList.remove('processing');
    anthropicBeam.classList.add('complete');
    anthropicLogo.classList.remove('fast-pulse');

    // Loop after completion
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 3500);
}

function resetAnimation() {
    progress = 0;
    currentSpeed = 0.25;
    targetSpeed = 0.25;
    currentMessageIndex = 0;
    nextSpeedChange = Date.now() + 1000;
    nextMessageChange = Date.now() + 3000;

    beamFill.style.width = '0%';
    beamTitle.textContent = "Claude is thinking";
    beamStatus.textContent = "Processing your request";
    beamPercentage.textContent = '0%';

    anthropicBeam.classList.remove('complete');
    anthropicBeam.setAttribute('aria-valuenow', '0');
}

function startAnimation() {
    anthropicBeam.classList.add('processing');
    animate();
}

// Start animation on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        startAnimation();
    }, 700);
});

// Keyboard accessibility - Space to restart
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        cancelAnimationFrame(animationFrame);
        resetAnimation();
        startAnimation();
    }
});