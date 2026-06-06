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

function replayProgress() {
    clearInterval(interval);
    progress = 0;
    const beamInfo = document.querySelector('.beam-info');
    beamInfo.innerHTML = '<span class="beam-text">Thinking</span>';
    const beamFill = document.querySelector('.beam-fill');
    beamFill.style.width = '0%';
    interval = setInterval(updateProgress, 16);
}

let progress = 0;

function updateProgress() {
    const beamFill = document.querySelector('.beam-fill');
    const beamInfo = document.querySelector('.beam-info');

    progress += 0.3;

    if (progress >= 100) {
        progress = 100;
        beamInfo.innerHTML = '<span class="beam-text complete">Complete <a href="https://claude.ai" class="beam-arrow" title="Return to Claude">›</a></span>';
        clearInterval(interval);

        setTimeout(() => {
            progress = 0;
            beamInfo.innerHTML = '<span class="beam-text">Thinking</span>';
            updateProgress();
            interval = setInterval(updateProgress, 16);
        }, 2000);
    }

    beamFill.style.width = `${progress}%`;
}

let interval = setInterval(updateProgress, 16);
