// Anthropic-branded progress animation with random speed variations
let progress = 0;
let animationFrame = null;
let currentSpeed = 0.3;
let targetSpeed = 0.3;

const beamProgress = document.querySelector('.beam-progress');
const beamPercentage = document.querySelector('.beam-percentage');
const statusText = document.querySelector('.status-text');
const anthropicBeam = document.querySelector('.anthropic-beam');

// Speed profiles mimicking Claude's thinking patterns
const speedProfiles = [
    { speed: 0.08, duration: 1200 },  // Very slow - deep analysis
    { speed: 0.25, duration: 800 },   // Slow - careful processing
    { speed: 0.95, duration: 400 },   // Fast burst - quick retrieval
    { speed: 0.02, duration: 1500 },  // Near pause - contemplating
    { speed: 0.6, duration: 600 },    // Medium - standard processing
    { speed: 0.15, duration: 900 },   // Slow-medium - reasoning
    { speed: 0.45, duration: 700 },   // Medium pace
    { speed: 1.2, duration: 300 },    // Very fast - confident processing
];

let nextSpeedChange = Date.now() + 800;
let currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];

function animate() {
    // Random speed changes for realistic AI processing
    if (Date.now() > nextSpeedChange && progress < 92) {
        currentProfile = speedProfiles[Math.floor(Math.random() * speedProfiles.length)];
        targetSpeed = currentProfile.speed;
        nextSpeedChange = Date.now() + currentProfile.duration + (Math.random() * 600);
    }

    // Smooth speed transitions
    const speedDiff = targetSpeed - currentSpeed;
    currentSpeed += speedDiff * 0.08;

    // Update progress
    if (progress < 100) {
        progress += currentSpeed;

        // Natural slowdown near completion
        if (progress > 88) {
            currentSpeed *= 0.92;
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

    // Update ARIA attribute for accessibility
    anthropicBeam.setAttribute('aria-valuenow', percentage);

    // Status updates matching Anthropic's tone
    if (progress < 15) {
        statusText.textContent = 'Initializing';
    } else if (progress < 35) {
        statusText.textContent = 'Understanding';
    } else if (progress < 55) {
        statusText.textContent = 'Analyzing';
    } else if (progress < 75) {
        statusText.textContent = 'Processing';
    } else if (progress < 90) {
        statusText.textContent = 'Synthesizing';
    } else if (progress < 100) {
        statusText.textContent = 'Finalizing';
    }
}

function completeAnimation() {
    cancelAnimationFrame(animationFrame);
    statusText.textContent = 'Complete';
    anthropicBeam.classList.remove('processing');
    anthropicBeam.classList.add('complete');

    // Loop animation after brief pause
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 2500);
}

function resetAnimation() {
    progress = 0;
    currentSpeed = 0.3;
    targetSpeed = 0.3;
    nextSpeedChange = Date.now() + 800;

    beamProgress.style.width = '0%';
    beamPercentage.textContent = '0%';
    statusText.textContent = 'Initializing';

    anthropicBeam.classList.remove('complete');
    anthropicBeam.setAttribute('aria-valuenow', '0');
}

function startAnimation() {
    anthropicBeam.classList.add('processing');
    animate();
}

// Start on page load with slight delay for effect
window.addEventListener('load', () => {
    setTimeout(() => {
        startAnimation();
    }, 400);
});

// Keyboard accessibility: Space to restart animation
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        cancelAnimationFrame(animationFrame);
        resetAnimation();
        startAnimation();
    }
});