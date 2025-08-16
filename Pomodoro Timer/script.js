
// Initialize audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Timer settings
let WORK_TIME = 25;
let SHORT_BREAK = 5;
let LONG_BREAK = 15;
let WARNING_TIME = 30; // 30 seconds warning before timer ends

let timer;
let minutes = WORK_TIME;
let seconds = 0;
let isRunning = false;
let currentMode = 'work';
let initialWorkTime = WORK_TIME; // Store initial work time setting
let cycleCount = 0;
let tasks = [];
// Initialize empty stats structure
let stats = {
    daily: {},
    weekly: {},
    monthly: {}
};

function playWarningBeep() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 660; // Higher pitch for warning
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
}

// Initialize stats for current date
function initializeStatsForToday() {
    const date = new Date();
    const dateKey = date.toISOString().split('T')[0];
    const weekKey = getWeekNumber(date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // Initialize daily stats if not exists
    if (!stats.daily[dateKey]) {
        stats.daily[dateKey] = { focusTime: 0, completedTasks: 0, cycles: 0 };
    }
    
    // Initialize weekly stats if not exists
    if (!stats.weekly[weekKey]) {
        stats.weekly[weekKey] = { focusTime: 0, completedTasks: 0, cycles: 0 };
    }
    
    // Initialize monthly stats if not exists
    if (!stats.monthly[monthKey]) {
        stats.monthly[monthKey] = { focusTime: 0, completedTasks: 0, cycles: 0 };
    }
}

// Canvas setup
const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const radius = 140;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Chart setup
const chartCanvas = document.getElementById('statsChart');
const chartCtx = chartCanvas.getContext('2d');

// Task Management
function toggleTaskInput() {
    const container = document.getElementById('taskInputContainer');
    container.classList.toggle('hidden');
    if (!container.classList.contains('hidden')) {
        document.getElementById('taskInput').focus();
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        tasks.unshift({
            id: Date.now(),
            text: taskText,
            completed: false,
            pomodoros: 0,
            active: false,
            createdAt: new Date().toISOString()
        });
        
        input.value = '';
        toggleTaskInput();
        updateTaskDisplay();
        saveTasks();
    }
}

function updateTaskDisplay() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.active ? 'active' : ''}`;
        
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTaskComplete(${task.id})">
                <span class="task-text">${task.text}</span>
                <span class="pomodoro-count">${task.pomodoros} 🍅</span>
            </div>
            <div class="task-actions">
                <button onclick="toggleTaskActive(${task.id})">${task.active ? '⏸️' : '▶️'}</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
    
    updateStats('completedTasks', tasks.filter(t => t.completed).length);
}

function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed && task.active) {
            task.active = false;
        }
        updateTaskDisplay();
        saveTasks();
    }
}

function toggleTaskActive(taskId) {
    tasks.forEach(t => t.active = t.id === taskId && !t.active);
    updateTaskDisplay();
    saveTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    updateTaskDisplay();
    saveTasks();
}

// Advanced Statistics
function updateStats(type, value) {
    // Ensure stats are initialized
    initializeStatsForToday();
    
    const date = new Date();
    const dateKey = date.toISOString().split('T')[0];
    const weekKey = getWeekNumber(date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    try {
        // Update stats
        if (type === 'focusTime') {
            stats.daily[dateKey].focusTime += value;
            stats.weekly[weekKey].focusTime += value;
            stats.monthly[monthKey].focusTime += value;
        } else if (type === 'completedTasks') {
            stats.daily[dateKey].completedTasks = value;
            stats.weekly[weekKey].completedTasks = value;
            stats.monthly[monthKey].completedTasks = value;
        } else if (type === 'cycles') {
            stats.daily[dateKey].cycles++;
            stats.weekly[weekKey].cycles++;
            stats.monthly[monthKey].cycles++;
        }
        
        updateStatsDisplay();
        saveData();
    } catch (error) {
        console.error('Error updating stats:', error);
        // Re-initialize stats if there was an error
        initializeStatsForToday();
    }
}

function updateStatsView() {
    const view = document.getElementById('statsView').value;
    const date = new Date();
    let currentStats;
    
    switch (view) {
        case 'today':
            currentStats = stats.daily[date.toISOString().split('T')[0]] || { focusTime: 0, completedTasks: 0, cycles: 0 };
            break;
        case 'week':
            currentStats = stats.weekly[getWeekNumber(date)] || { focusTime: 0, completedTasks: 0, cycles: 0 };
            break;
        case 'month':
            currentStats = stats.monthly[`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`] || 
                         { focusTime: 0, completedTasks: 0, cycles: 0 };
            break;
    }
    
    document.getElementById('focusTime').textContent = currentStats.focusTime;
    document.getElementById('completedTasks').textContent = currentStats.completedTasks;
    document.getElementById('cycleCount').textContent = currentStats.cycles;
    
    updateStatsChart(view);
}

function updateStatsChart(view) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const data = getChartData(view);
    
    // Clear previous chart
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw new chart
    const maxValue = Math.max(...data.values);
    const barWidth = ctx.canvas.width / data.labels.length - 10;
    const scale = ctx.canvas.height / (maxValue || 1);
    
    data.values.forEach((value, index) => {
        const x = index * (barWidth + 10) + 5;
        const barHeight = value * scale;
        const y = ctx.canvas.height - barHeight;
        
        ctx.fillStyle = 'rgba(75, 192, 192, 0.6)';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#666';
        ctx.font = '12px Inter, Arial, sans-serif';
        ctx.fillText(data.labels[index], x, ctx.canvas.height - 5);
    });
}

function getChartData(view) {
    const date = new Date();
    let data = { labels: [], values: [] };
    
    switch (view) {
        case 'today':
            // Hourly breakdown
            for (let i = 0; i < 24; i++) {
                data.labels.push(`${i}:00`);
                data.values.push(0); // Would need more detailed tracking for hourly data
            }
            break;
            
        case 'week':
            // Daily breakdown
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 0; i < 7; i++) {
                const d = new Date(date);
                d.setDate(d.getDate() - i);
                data.labels.unshift(days[d.getDay()]);
                const key = d.toISOString().split('T')[0];
                data.values.unshift(stats.daily[key]?.focusTime || 0);
            }
            break;
            
        case 'month':
            // Weekly breakdown
            for (let i = 0; i < 4; i++) {
                data.labels.push(`Week ${i + 1}`);
                const weekKey = getWeekNumber(new Date(date.setDate(date.getDate() - 7 * i)));
                data.values.push(stats.weekly[weekKey]?.focusTime || 0);
            }
            break;
    }
    
    return data;
}

function getWeekNumber(d) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return date.getFullYear() + '-W' + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Load and Save Data
function loadData() {
    try {
        const savedStats = JSON.parse(localStorage.getItem('pomodoroStats') || '{"daily":{},"weekly":{},"monthly":{}}');
        const savedTasks = JSON.parse(localStorage.getItem('pomodoroTasks') || '[]');
        
        stats = savedStats;
        tasks = savedTasks;
        
        // Ensure stats structure is initialized
        initializeStatsForToday();
        
        updateTaskDisplay();
        updateStatsView();
    } catch (error) {
        console.error('Error loading data:', error);
        // Reset to default state if there's an error
        stats = { daily: {}, weekly: {}, monthly: {} };
        tasks = [];
        initializeStatsForToday();
    }
}

function saveData() {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        document.getElementById('startBtn').innerText = 'Pause';
        
        // Update button visibility based on current mode
        updateButtonVisibility(currentMode);
    } else {
        isRunning = false;
        clearInterval(timer);
        document.getElementById('startBtn').innerText = 'Resume';
    }
}

function updateButtonVisibility(mode) {
    const shortBreakBtn = document.getElementById('shortBreakBtn');
    const longBreakBtn = document.getElementById('longBreakBtn');
    const resumeWorkBtn = document.getElementById('resumeWorkBtn');

    if (mode === 'work') {
        shortBreakBtn.style.display = 'inline-block';
        longBreakBtn.style.display = 'inline-block';
        resumeWorkBtn.style.display = 'none';
    } else {
        shortBreakBtn.style.display = 'none';
        longBreakBtn.style.display = 'none';
        resumeWorkBtn.style.display = 'inline-block';
    }
}

function startShortBreak() {
    clearInterval(timer);
    minutes = SHORT_BREAK;
    seconds = 0;
    currentMode = 'shortBreak';
    isRunning = true;
    document.querySelector('.timer-type').innerText = 'Short Break';
    document.getElementById('startBtn').innerText = 'Pause';
    updateButtonVisibility('shortBreak');
    updateDisplay();
    timer = setInterval(updateTimer, 1000);
}

function startLongBreak() {
    clearInterval(timer);
    minutes = LONG_BREAK;
    seconds = 0;
    currentMode = 'longBreak';
    isRunning = true;
    document.querySelector('.timer-type').innerText = 'Long Break';
    document.getElementById('startBtn').innerText = 'Pause';
    updateButtonVisibility('longBreak');
    updateDisplay();
    timer = setInterval(updateTimer, 1000);
}

function resumeWork() {
    clearInterval(timer);
    minutes = initialWorkTime;
    seconds = 0;
    currentMode = 'work';
    isRunning = true;
    document.querySelector('.timer-type').innerText = 'Work Time';
    document.getElementById('startBtn').innerText = 'Pause';
    updateButtonVisibility('work');
    updateDisplay();
    timer = setInterval(updateTimer, 1000);
}

function playNotification() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
}

function updateTimer() {
    // Check if we need to play warning sound
    if (minutes === 0 && seconds === WARNING_TIME) {
        playWarningBeep();
    }

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startBtn').innerText = 'Start';
        playNotification();
        
        if (currentMode === 'work') {
            // Update statistics
            cycleCount++;
            updateStats('focusTime', initialWorkTime);
            
            if (tasks.length > 0 && tasks[0].active) {
                tasks[0].pomodoros++;
                updateTaskDisplay();
            }
            
            // Automatically start short break
            startShortBreak();
        } else {
            updateButtonVisibility('work');
            // Set up for work but don't auto-start
            minutes = initialWorkTime;
            seconds = 0;
            currentMode = 'work';
            document.querySelector('.timer-type').innerText = 'Work Time';
            updateDisplay();
        }
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
        drawProgress();
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = WORK_TIME;
    seconds = 0;
    currentMode = 'work';
    document.querySelector('.timer-type').innerText = 'Work Time';
    updateDisplay();
    document.getElementById('startBtn').innerText = 'Start';
    updateButtonVisibility('work');
}

function updateDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    drawProgress();
}

function drawProgress() {
    const totalSeconds = getCurrentModeTime() * 60;
    const currentSeconds = minutes * 60 + seconds;
    const progress = currentSeconds / totalSeconds;
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw the clock markings first
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const isMainMark = i % 3 === 0;
        const markLength = isMainMark ? 20 : 10;
        
        const startX = centerX + (radius - markLength) * Math.cos(angle);
        const startY = centerY + (radius - markLength) * Math.sin(angle);
        const endX = centerX + radius * Math.cos(angle);
        const endY = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        // Improved contrast for dark mode
        ctx.strokeStyle = isDarkMode ? '#e2e8f0' : '#2d3748';
        ctx.lineWidth = isMainMark ? 4 : 2;
        ctx.stroke();

        if (isMainMark) {
            const numberRadius = radius - 35;
            const numberX = centerX + numberRadius * Math.cos(angle);
            const numberY = centerY + numberRadius * Math.sin(angle);
            ctx.font = 'bold 24px Inter, Arial, sans-serif';
            // Improved contrast for dark mode numbers
            ctx.fillStyle = isDarkMode ? '#f1f5f9' : '#2d3748';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const number = ((i / 3 * 15) || 60);
            ctx.fillText(number.toString(), numberX, numberY);
        }
    }

    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * (1 - progress)));
    ctx.strokeStyle = currentMode === 'work' ? '#4CAF50' : '#2196F3';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Calculate hand angles for clockwise motion
    const totalMinutes = getCurrentModeTime();
    const currentMinute = minutes + seconds / 60;
    const minuteAngle = (1 - (currentMinute / totalMinutes)) * 2 * Math.PI - Math.PI / 2;
    const secondAngle = (1 - (seconds / 60)) * 2 * Math.PI - Math.PI / 2;

    // Draw minute hand
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + radius * 0.7 * Math.cos(minuteAngle),
        centerY + radius * 0.7 * Math.sin(minuteAngle)
    );
    // Improved contrast for dark mode minute hand
    ctx.strokeStyle = isDarkMode ? '#f8fafc' : '#2d3748';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw second hand
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + radius * 0.8 * Math.cos(secondAngle),
        centerY + radius * 0.8 * Math.sin(secondAngle)
    );
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
}

function getCurrentModeTime() {
    switch (currentMode) {
        case 'work': return WORK_TIME;
        case 'shortBreak': return SHORT_BREAK;
        case 'longBreak': return LONG_BREAK;
        default: return WORK_TIME;
    }
}

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('hidden');
}

function updateStatsDisplay() {
    const date = new Date();
    const dateKey = date.toISOString().split('T')[0];
    
    // Ensure today's stats exist
    if (!stats.daily[dateKey]) {
        initializeStatsForToday();
    }

    const todayStats = stats.daily[dateKey];
    
    // Update the display with today's stats
    document.getElementById('focusTime').textContent = todayStats.focusTime || 0;
    document.getElementById('completedTasks').textContent = todayStats.completedTasks || 0;
    document.getElementById('cycleCount').textContent = todayStats.cycles || 0;
}

// Settings event listeners
document.getElementById('workTime').addEventListener('change', function(e) {
    WORK_TIME = parseInt(e.target.value);
    initialWorkTime = WORK_TIME; // Update initial work time setting
    if (currentMode === 'work') resetTimer();
});

document.getElementById('shortBreakTime').addEventListener('change', function(e) {
    SHORT_BREAK = parseInt(e.target.value);
    if (currentMode === 'shortBreak') resetTimer();
});

document.getElementById('longBreakTime').addEventListener('change', function(e) {
    LONG_BREAK = parseInt(e.target.value);
    if (currentMode === 'longBreak') resetTimer();
});

// Event Listeners
document.getElementById('taskInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize
loadData();
drawProgress();
updateStatsView();

// Theme integration with main site
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Redraw the timer canvas when theme changes
    drawProgress();
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}
