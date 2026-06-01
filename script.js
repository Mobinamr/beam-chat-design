// Claude light mode progress animation with random speed variations
let progress = 0;
let animationFrame = null;
let currentSpeed = 0.3;
let targetSpeed = 0.3;

const beamProgress = document.querySelector('.beam-progress');
const beamStatus = document.querySelector('.beam-status');
const claudeBeam = document.querySelector('.claude-beam');
const claudeLogo = document.querySelector('.claude-logo');

// Speed profiles matching Claude's actual processing patterns
const speedProfiles = [
    { speed: 0.08, duration: 1400 },  // Very slow - deep thinking
    { speed: 0.2, duration: 1000 },   // Slow - careful processing
    { speed: 1.0, duration: 400 },    // Fast burst - quick processing
    { speed: 0.02, duration: 1800 },  // Almost paused - contemplating
    { speed: 0.5, duration: 700 },    // Medium speed
    { speed: 0.12, duration: 1100 },  // Slow-medium
    { speed: 1.3, duration: 300 },    // Very fast burst
    { speed: 0.35, duration: 800 },   // Medium-slow
    { speed: 0.03, duration: 1500 },  // Very slow pause
];

let nextSpeedChange = Date.now() + 800;
let currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];

// Claude-like status messages
const statusMessages = [
    "Thinking",
    "Processing",
    "Analyzing",
    "Understanding",
    "Generating"
];

let currentStatusIndex = 0;
let nextStatusChange = Date.now() + 2500;

function animate() {
    // Random speed changes
    if (Date.now() > nextSpeedChange && progress < 93) {
        currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];
        targetSpeed = currentProfile.speed;
        nextSpeedChange = Date.now() + currentProfile.duration + (Math.random() * 400);
    }

    // Change status message
    if (Date.now() > nextStatusChange && progress < 85) {
        currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
        beamStatus.textContent = statusMessages[currentStatusIndex];
        nextStatusChange = Date.now() + 2000 + (Math.random() * 1500);
    }

    // Smooth speed transitions
    currentSpeed += (targetSpeed - currentSpeed) * 0.06;

    // Update progress
    if (progress < 100) {
        progress += currentSpeed;

        // Natural slowdown near end
        if (progress > 88) {
            currentSpeed *= 0.93;
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
    beamProgress.style.width = `${progress}%`;
    claudeBeam.setAttribute('aria-valuenow', Math.floor(progress));

    // Logo pulse based on speed
    if (currentSpeed > 0.5) {
        claudeLogo.classList.add('pulsing');
    } else {
        claudeLogo.classList.remove('pulsing');
    }
}

function completeAnimation() {
    cancelAnimationFrame(animationFrame);
    beamStatus.textContent = "Complete";
    claudeBeam.classList.remove('processing');
    claudeBeam.classList.add('complete');
    claudeLogo.classList.remove('pulsing');

    // Loop animation
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 3000);
}

function resetAnimation() {
    progress = 0;
    currentSpeed = 0.3;
    targetSpeed = 0.3;
    currentStatusIndex = 0;
    nextSpeedChange = Date.now() + 800;
    nextStatusChange = Date.now() + 2500;

    beamProgress.style.width = '0%';
    beamStatus.textContent = "Thinking";

    claudeBeam.classList.remove('complete');
    claudeBeam.setAttribute('aria-valuenow', '0');
}

function startAnimation() {
    claudeBeam.classList.add('processing');
    animate();
}

// Start on load
window.addEventListener('load', () => {
    setTimeout(() => {
        startAnimation();
    }, 600);
});