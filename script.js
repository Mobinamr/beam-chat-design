// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// Claude thinking messages
const thinkingMessages = [
    "Thinking",
    "Analyzing",
    "Understanding",
    "Processing",
    "Reasoning",
    "Considering",
    "Formulating",
    "Generating"
];

// Simple progress animation
let progress = 0;
let currentMessageIndex = 0;

function updateProgress() {
    const beamFill = document.querySelector('.beam-fill');
    const beamPercentage = document.querySelector('.beam-percentage');
    const beamText = document.querySelector('.beam-text');

    progress += Math.random() * 2 + 0.5;

    // Change message every 20% progress
    const newMessageIndex = Math.floor(progress / 15) % thinkingMessages.length;
    if (newMessageIndex !== currentMessageIndex) {
        currentMessageIndex = newMessageIndex;
        beamText.textContent = thinkingMessages[currentMessageIndex];
    }

    if (progress >= 100) {
        progress = 100;
        beamText.textContent = "Complete";
        clearInterval(interval);

        setTimeout(() => {
            progress = 0;
            currentMessageIndex = 0;
            beamText.textContent = thinkingMessages[0];
            updateProgress();
            interval = setInterval(updateProgress, 100);
        }, 1000);
    }

    beamFill.style.width = `${progress}%`;
    beamPercentage.textContent = `${Math.floor(progress)}%`;
}

let interval = setInterval(updateProgress, 100);