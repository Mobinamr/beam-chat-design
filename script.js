// Claude-exact progress animation with random speed variations
let progress = 0;
let animationFrame = null;
let currentSpeed = 0.2;
let targetSpeed = 0.2;

const beamProgress = document.querySelector('.beam-progress');
const beamStatus = document.querySelector('.beam-status');
const claudeBeam = document.querySelector('.claude-beam');
const claudeLogo = document.querySelector('.claude-logo');

// Speed profiles matching Claude's actual processing patterns
const speedProfiles = [
    { speed: 0.05, duration: 1500 },  // Very slow - deep thinking
    { speed: 0.15, duration: 1000 },  // Slow - processing
    { speed: 0.8, duration: 300 },    // Fast burst
    { speed: 0.01, duration: 2000 },  // Almost stopped - contemplating
    { speed: 0.4, duration: 700 },    // Medium speed
    { speed: 0.1, duration: 1200 },   // Slow crawl
    { speed: 1.0, duration: 200 },    // Very fast
    { speed: 0.3, duration: 800 },    // Medium slow
];

let nextSpeedChange = Date.now() + 1000;
let currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];

// Status messages like Claude
const statusMessages = [
    "Thinking",
    "Processing",
    "Analyzing",
    "Understanding",
    "Generating response"
];

let currentStatusIndex = 0;
let nextStatusChange = Date.now() + 2000;

function animate() {
    // Change speed randomly
    if (Date.now() > nextSpeedChange && progress < 95) {
        currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];
        targetSpeed = currentProfile.speed;
        nextSpeedChange = Date.now() + currentProfile.duration + (Math.random() * 500);
    }

    // Change status message periodically
    if (Date.now() > nextStatusChange && progress < 90) {
        currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
        beamStatus.textContent = statusMessages[currentStatusIndex];
        nextStatusChange = Date.now() + 2000 + (Math.random() * 1000);
    }

    // Smooth speed transitions
    currentSpeed += (targetSpeed - currentSpeed) * 0.05;

    // Update progress
    if (progress < 100) {
        progress += currentSpeed;

        // Slow down near completion
        if (progress > 90) {
            currentSpeed *= 0.9;
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

    // Logo pulse intensity based on speed
    const pulseIntensity = Math.min(currentSpeed * 2, 1);
    claudeLogo.style.opacity = 0.8 + (pulseIntensity * 0.2);
}

function completeAnimation() {
    cancelAnimationFrame(animationFrame);
    beamStatus.textContent = "Complete";
    claudeBeam.classList.remove('processing');
    claudeBeam.classList.add('complete');

    // Loop after pause
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 3000);
}

function resetAnimation() {
    progress = 0;
    currentSpeed = 0.2;
    targetSpeed = 0.2;
    currentStatusIndex = 0;
    nextSpeedChange = Date.now() + 1000;
    nextStatusChange = Date.now() + 2000;

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
    }, 500);
});