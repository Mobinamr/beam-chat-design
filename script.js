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

// Simple progress animation
let progress = 0;

function updateProgress() {
    const beamFill = document.querySelector('.beam-fill');
    const beamPercentage = document.querySelector('.beam-percentage');
    const beamText = document.querySelector('.beam-text');

    progress += Math.random() * 2 + 0.5;

    if (progress >= 100) {
        progress = 100;
        beamText.textContent = "Complete";
        clearInterval(interval);

        setTimeout(() => {
            progress = 0;
            beamText.textContent = "Thinking";
            updateProgress();
            interval = setInterval(updateProgress, 100);
        }, 1000);
    }

    beamFill.style.width = `${progress}%`;
    beamPercentage.textContent = `${Math.floor(progress)}%`;
}

let interval = setInterval(updateProgress, 100);