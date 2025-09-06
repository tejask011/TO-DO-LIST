// Array to store all tasks
let tasks = [];
let taskIdCounter = 1;

// Add task function
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const scheduleInput = document.getElementById('scheduleInput');
    
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        schedule: scheduleInput.value || null
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Clear input fields
    taskInput.value = '';
    scheduleInput.value = '';
    
    // Refresh the display
    displayTasks();
}

// Delete task function
function deleteTask(taskId) {
    // Remove task from array
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Refresh the display
    displayTasks();
}

// Display all tasks
function displayTasks() {
    const todoList = document.getElementById('todoList');
    
    // Clear current display
    todoList.innerHTML = '';
    
    if (tasks.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }
    
    // Create HTML for each task
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        
        const scheduleText = task.schedule ? 
            `Scheduled for: ${formatDateTime(task.schedule)}` : 
            'No schedule set';
        
        taskDiv.innerHTML = `
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-schedule">${scheduleText}</div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        todoList.appendChild(taskDiv);
    });
}

// Format datetime for display
function formatDateTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to add task
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Initial display
    displayTasks();
});