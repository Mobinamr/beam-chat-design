// AI response simulation
const sampleResponse = `Quantum computing represents a revolutionary paradigm in computational technology,
leveraging quantum mechanical phenomena to process information in fundamentally new ways.
Unlike classical computers that use bits representing either 0 or 1, quantum computers utilize
qubits that can exist in superposition states, enabling parallel processing of multiple possibilities simultaneously...`;

let progress = 0;
let estimatedTime = 45;
let isTabActive = true;
let progressInterval = null;
let timeInterval = null;

const progressBeam = document.getElementById('progress-beam');
const previewPanel = document.getElementById('preview-panel');
const chatContainer = document.querySelector('.chat-container');
const beamFill = document.querySelector('.beam-fill');
const beamPercentage = document.querySelector('.beam-percentage');
const beamTime = document.querySelector('.beam-time');
const previewProgress = document.querySelector('.preview-progress');
const previewText = document.querySelector('.preview-text');

// Simulate tab visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Tab became inactive
        isTabActive = false;
        showProgressBeam();
        chatContainer.classList.add('inactive');
    } else {
        // Tab became active
        isTabActive = true;
        hideProgressBeam();
        chatContainer.classList.remove('inactive');
    }
});

// Progress beam hover functionality
progressBeam.addEventListener('mouseenter', () => {
    if (!isTabActive) {
        showPreviewPanel();
    }
});

progressBeam.addEventListener('mouseleave', () => {
    hidePreviewPanel();
});

// Simulate clicking away from tab (for demo purposes)
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        simulateTabSwitch();
    }
});

function simulateTabSwitch() {
    isTabActive = !isTabActive;
    if (!isTabActive) {
        showProgressBeam();
        chatContainer.classList.add('inactive');
        startProgress();
    } else {
        hideProgressBeam();
        chatContainer.classList.remove('inactive');
        stopProgress();
    }
}

function showProgressBeam() {
    progressBeam.classList.add('active');
    if (progress === 0) {
        startProgress();
    }
}

function hideProgressBeam() {
    progressBeam.classList.remove('active');
}

function showPreviewPanel() {
    previewPanel.classList.add('visible');
}

function hidePreviewPanel() {
    previewPanel.classList.remove('visible');
}

function startProgress() {
    if (progressInterval) return;

    progressInterval = setInterval(() => {
        if (progress < 100) {
            // Simulate varying speed
            const increment = Math.random() * 3 + 0.5;
            progress = Math.min(progress + increment, 100);

            updateProgress();
            updatePreviewText();

            if (progress >= 100) {
                completeProgress();
            }
        }
    }, 200);

    // Update estimated time
    timeInterval = setInterval(() => {
        if (estimatedTime > 0) {
            estimatedTime--;
            beamTime.textContent = `Est. ${estimatedTime}s`;
        }
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
    clearInterval(timeInterval);
    progressInterval = null;
    timeInterval = null;
}

function updateProgress() {
    const percentage = Math.floor(progress);
    beamFill.style.width = `${percentage}%`;
    beamPercentage.textContent = `${percentage}%`;
    previewProgress.textContent = `${percentage}% Complete`;
}

function updatePreviewText() {
    const charCount = Math.floor((sampleResponse.length * progress) / 100);
    previewText.textContent = sampleResponse.substring(0, charCount);
}

function completeProgress() {
    stopProgress();
    beamTime.textContent = 'Complete';
    previewProgress.textContent = 'Response Ready';
    document.querySelector('.preview-status').textContent = 'Complete';
    document.querySelector('.preview-status').style.background = '#e6ffe6';
    document.querySelector('.preview-status').style.color = '#00a000';

    // Hide typing indicators
    document.querySelectorAll('.preview-typing, .typing-indicator').forEach(el => {
        el.style.display = 'none';
    });
}

// Reset functionality for demo
function resetDemo() {
    progress = 0;
    estimatedTime = 45;
    updateProgress();
    beamTime.textContent = `Est. ${estimatedTime}s`;
    previewText.textContent = '';
    document.querySelector('.preview-status').textContent = 'Processing...';
    document.querySelector('.preview-status').style.background = '#e6f2ff';
    document.querySelector('.preview-status').style.color = '#007aff';

    // Show typing indicators
    document.querySelectorAll('.preview-typing, .typing-indicator').forEach(el => {
        el.style.display = 'flex';
    });
}

// Add reset button for demo
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        resetDemo();
    }
});

// Instructions overlay
const instructions = document.createElement('div');
instructions.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
`;
instructions.innerHTML = `
    <strong>Demo Controls:</strong><br>
    Ctrl+S - Simulate tab switch<br>
    Ctrl+R - Reset demo<br>
    Hover over progress bar to see preview
`;
document.body.appendChild(instructions);

// Auto-hide instructions after 10 seconds
setTimeout(() => {
    instructions.style.transition = 'opacity 0.5s';
    instructions.style.opacity = '0';
    setTimeout(() => instructions.remove(), 500);
}, 10000);