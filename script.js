// Hover functionality for preview panel
const indicator = document.getElementById('progressIndicator');
const previewPanel = document.getElementById('previewPanel');

indicator.addEventListener('mouseenter', () => {
    previewPanel.classList.add('visible');
});

indicator.addEventListener('mouseleave', () => {
    previewPanel.classList.remove('visible');
});

previewPanel.addEventListener('mouseenter', () => {
    previewPanel.classList.add('visible');
});

previewPanel.addEventListener('mouseleave', () => {
    previewPanel.classList.remove('visible');
});

// Simulated progress animation
let progress = 45;
let timeRemaining = 30;

function updateProgress() {
    const percentage = document.querySelector('.progress-percentage');
    const estimatedTime = document.querySelector('.estimated-time');
    const beamFillSmall = document.querySelector('.beam-fill-small');
    const previewStatus = document.querySelector('.preview-status');
    const progressFillPreview = document.querySelector('.progress-fill-preview');
    const timeRemainingText = document.querySelector('.time-remaining');

    // Random speed variation
    const increment = Math.random() * 2 + 0.5;
    progress = Math.min(progress + increment, 100);
    timeRemaining = Math.max(Math.floor((100 - progress) * 0.5), 0);

    // Update all elements
    percentage.textContent = `${Math.floor(progress)}%`;
    estimatedTime.textContent = `~${timeRemaining}s`;
    beamFillSmall.style.width = `${progress}%`;
    previewStatus.textContent = `${Math.floor(progress)}% complete`;
    progressFillPreview.style.width = `${progress}%`;
    timeRemainingText.textContent = `Estimated: ${timeRemaining}s remaining`;

    // Complete
    if (progress >= 100) {
        clearInterval(progressInterval);
        estimatedTime.textContent = 'Done';
        previewStatus.textContent = 'Complete';
        timeRemainingText.textContent = 'Processing complete';

        // Reset after 2 seconds
        setTimeout(() => {
            progress = 0;
            timeRemaining = 45;
            updateProgress();
            progressInterval = setInterval(updateProgress, 200);
        }, 2000);
    }
}

// Start animation
let progressInterval = setInterval(updateProgress, 200);