// State variables managing operational timestamps
let performanceStartTime = 0;
let accumulatedElapsedTime = 0;
let microClockInterval = null;
let recordedLapIndex = 0;

// Element Cache Layer
const mainDisplay = document.getElementById('mainDisplay');
const msDisplay = document.getElementById('msDisplay');
const btnAction = document.getElementById('btnAction');
const btnLap = document.getElementById('btnLap');
const btnReset = document.getElementById('btnReset');
const lapList = document.getElementById('lapList');
const lapCounter = document.getElementById('lapCounter');

/**
 * Parses and maps timestamps into unified string structures
 * @param {number} totalMilliseconds 
 * @returns {Object} Structured time calculations
 */
function parseTimeStructure(totalMilliseconds) {
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const ms = Math.floor((totalMilliseconds % 1000) / 10);

    return {
        baseTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        msTime: ms.toString().padStart(2, '0')
    };
}

/**
 * Primary visual execution frame loop driven by interval engine
 */
function refreshTrackingView() {
    const elapsed = Date.now() - performanceStartTime;
    const timeData = parseTimeStructure(elapsed);
    
    // Updates UI cleanly with structural layout text mappings
    mainDisplay.childNodes[0].textContent = timeData.baseTime;
    msDisplay.textContent = timeData.msTime;
}

/**
 * Toggles structural execution logic between Running and Paused system layers
 */
function toggleSystemActivity() {
    if (!microClockInterval) {
        // System Launch Routine
        performanceStartTime = Date.now() - accumulatedElapsedTime;
        microClockInterval = setInterval(refreshTrackingView, 10);
        
        // Update Action State Interfaces
        btnAction.textContent = 'Pause';
        btnAction.classList.add('btn-pause');
        btnLap.disabled = false;
    } else {
        // System Hold Routine
        clearInterval(microClockInterval);
        accumulatedElapsedTime = Date.now() - performanceStartTime;
        microClockInterval = null;
        
        // Reverse Interface Modifications
        btnAction.textContent = 'Start';
        btnAction.classList.remove('btn-pause');
    }
}

/**
 * Tracks split data without interrupting core clock loop pipelines
 */
function recordLapSplit() {
    if (!microClockInterval && accumulatedElapsedTime === 0) return;

    recordedLapIndex++;
    const activeElapsed = microClockInterval ? (Date.now() - performanceStartTime) : accumulatedElapsedTime;
    const timeData = parseTimeStructure(activeElapsed);

    // Dom Creation Node
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-index">Lap ${recordedLapIndex}</span>
        <span class="lap-timestamp">${timeData.baseTime}.${timeData.msTime}</span>
    `;

    // High performance UI injection pipeline architecture
    lapList.insertBefore(lapItem, lapList.firstChild);
    lapCounter.textContent = `${recordedLapIndex} Lap${recordedLapIndex > 1 ? 's' : ''}`;
}

/**
 * Flushes memory registers and completely resets interface modules
 */
function resetSystemState() {
    // Clear Execution Interceptors
    clearInterval(microClockInterval);
    microClockInterval = null;
    accumulatedElapsedTime = 0;
    recordedLapIndex = 0;

    // Flush Graphical Display Nodes
    mainDisplay.childNodes[0].textContent = '00:00:00';
    msDisplay.textContent = '00';
    lapList.innerHTML = '';
    lapCounter.textContent = '0 Laps';

    // Return system rules to fresh boot metrics
    btnAction.textContent = 'Start';
    btnAction.classList.remove('btn-pause');
    btnLap.disabled = true;
}

// Attach listeners to explicit interface buttons
btnAction.addEventListener('click', toggleSystemActivity);
btnLap.addEventListener('click', recordLapSplit);
btnReset.addEventListener('click', resetSystemState);