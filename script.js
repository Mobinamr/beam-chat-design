// Claude-style progress animation with random speed variations
let progress = 0;
let animationFrame = null;
let currentSpeed = 0.5;
let targetSpeed = 0.5;
let speedTransition = 0;

const beamProgress = document.querySelector('.beam-progress');
const beamPercentage = document.querySelector('.beam-percentage');
const beamStatus = document.querySelector('.beam-status');
const claudeBeam = document.querySelector('.claude-beam');

// Speed profiles for different "thinking" phases
const speedProfiles = [
    { speed: 0.1, duration: 800 },   // Very slow - deep thinking
    { speed: 0.3, duration: 600 },   // Slow - processing
    { speed: 1.2, duration: 400 },   // Fast - quick processing
    { speed: 0.05, duration: 1000 }, // Pause - contemplating
    { speed: 0.8, duration: 500 },   // Medium fast
    { speed: 0.4, duration: 700 },   // Medium slow
];

let nextSpeedChange = Date.now() + 1000;
let currentProfile = speedProfiles[0];

function animate() {
    // Check if we need to change speed
    if (Date.now() > nextSpeedChange && progress < 95) {
        // Pick a random speed profile
        currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];
        targetSpeed = currentProfile.speed;
        nextSpeedChange = Date.now() + currentProfile.duration + Math.random() * 500;
    }

    // Smooth speed transition
    if (Math.abs(currentSpeed - targetSpeed) > 0.01) {
        currentSpeed += (targetSpeed - currentSpeed) * 0.1;
    }

    // Update progress with current speed
    if (progress < 100) {
        progress += currentSpeed;

        // Slow down approaching 100%
        if (progress > 90) {
            currentSpeed *= 0.95;
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
    beamProgress.style.width = `${progress}%`;
    beamPercentage.textContent = `${percentage}%`;

    // Update status text based on progress
    if (progress < 30) {
        beamStatus.textContent = 'Analyzing';
    } else if (progress < 60) {
        beamStatus.textContent = 'Processing';
    } else if (progress < 90) {
        beamStatus.textContent = 'Generating';
    } else if (progress < 100) {
        beamStatus.textContent = 'Finalizing';
    }
}

function completeAnimation() {
    cancelAnimationFrame(animationFrame);
    beamStatus.textContent = 'Complete';
    claudeBeam.classList.remove('processing');

    // Reset after 2 seconds
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 2000);
}

function resetAnimation() {
    progress = 0;
    currentSpeed = 0.5;
    targetSpeed = 0.5;
    nextSpeedChange = Date.now() + 1000;

    beamProgress.style.width = '0%';
    beamPercentage.textContent = '0%';
    beamStatus.textContent = 'Processing';
}

function startAnimation() {
    claudeBeam.classList.add('processing');
    animate();
}

// Start animation on load
setTimeout(() => {
    startAnimation();
}, 500);