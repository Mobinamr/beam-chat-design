// Simple progress animation
let progress = 0;

function updateProgress() {
    const beamFill = document.querySelector('.beam-fill');
    const beamPercentage = document.querySelector('.beam-percentage');

    progress += Math.random() * 2 + 0.5;

    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
            progress = 0;
            updateProgress();
            interval = setInterval(updateProgress, 100);
        }, 1000);
    }

    beamFill.style.width = `${progress}%`;
    beamPercentage.textContent = `${Math.floor(progress)}%`;
}

let interval = setInterval(updateProgress, 100);