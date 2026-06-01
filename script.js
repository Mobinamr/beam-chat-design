// Progress animation variables
let progress = 0;
let estimatedTime = 45;
let progressInterval = null;
let timeInterval = null;

const beamFill = document.querySelector('.beam-fill');
const beamPercentage = document.querySelector('.beam-percentage');
const beamTime = document.querySelector('.beam-time');
const previewProgress = document.querySelector('.preview-progress');
const previewText = document.querySelector('.preview-text');
const previewPanel = document.getElementById('preview-panel');

// Sample text for preview animation
const sampleText = "Processing your request with advanced AI algorithms...";
let currentTextIndex = 0;

// Auto-start the animation loop
function startAnimationCycle() {
    resetAnimation();
    startProgress();

    // Restart cycle after completion
    setTimeout(() => {
        startAnimationCycle();
    }, 6000);
}

function startProgress() {
    progressInterval = setInterval(() => {
        if (progress < 100) {
            // Smooth progress increment
            const increment = Math.random() * 2 + 0.5;
            progress = Math.min(progress + increment, 100);

            updateProgress();
            updatePreviewText();

            if (progress >= 100) {
                completeProgress();
            }
        }
    }, 50);

    // Update time countdown
    timeInterval = setInterval(() => {
        if (estimatedTime > 0) {
            estimatedTime--;
            beamTime.textContent = `Est. ${estimatedTime}s`;
        }
    }, 1000);
}

function updateProgress() {
    const percentage = Math.floor(progress);
    beamPercentage.textContent = `${percentage}%`;
    previewProgress.textContent = `${percentage}% Complete`;
}

function updatePreviewText() {
    const charCount = Math.floor((sampleText.length * progress) / 100);
    previewText.textContent = sampleText.substring(0, charCount);
}

function completeProgress() {
    clearInterval(progressInterval);
    clearInterval(timeInterval);

    beamTime.textContent = 'Complete';
    previewProgress.textContent = 'Processing Complete';

    // Update status
    const statusElement = document.querySelector('.preview-status');
    statusElement.textContent = 'Complete';
    statusElement.style.background = 'linear-gradient(135deg, rgba(0, 255, 122, 0.1), rgba(0, 255, 122, 0.05))';
    statusElement.style.color = '#00c957';

    // Hide typing indicators
    document.querySelector('.preview-typing').style.opacity = '0';
}

function resetAnimation() {
    progress = 0;
    estimatedTime = 45;
    currentTextIndex = 0;

    clearInterval(progressInterval);
    clearInterval(timeInterval);

    // Reset UI
    updateProgress();
    beamTime.textContent = `Est. ${estimatedTime}s`;
    previewText.textContent = '';

    const statusElement = document.querySelector('.preview-status');
    statusElement.textContent = 'Active';
    statusElement.style.background = 'linear-gradient(135deg, rgba(0, 122, 255, 0.1), rgba(0, 122, 255, 0.05))';
    statusElement.style.color = '#007aff';

    document.querySelector('.preview-typing').style.opacity = '1';
}

// Start animation on load
setTimeout(() => {
    startAnimationCycle();
}, 500);