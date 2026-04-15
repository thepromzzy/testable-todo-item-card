// script.js - Stage 1a Advanced Todo Card (Plain CSS + Full Interactivity)

let currentTodo = {
    title: "Build Testable Todo Card",
    description: "Implement a fully testable, accessible, and responsive Todo card component with all required data-testid values, keyboard navigation, and live time-remaining updates. This is a longer description to test the expand/collapse feature.",
    priority: "Medium",
    dueDate: new Date('2026-05-20T23:59:59Z'),
    status: "Pending"
};

let originalTodo = {};

const DUE_DATE = currentTodo.dueDate;

// Render card
function renderCard() {
    // Title + strike-through
    const titleEl = document.getElementById('todo-title');
    titleEl.textContent = currentTodo.title;
    titleEl.classList.toggle('strike-through', currentTodo.status === 'Done');

    // Description
    document.getElementById('todo-description').textContent = currentTodo.description;

    // Priority badge + indicator
    const priorityBadge = document.getElementById('priority-badge');
    priorityBadge.textContent = currentTodo.priority.toUpperCase();
    priorityBadge.style.backgroundColor = 
        currentTodo.priority === 'High' ? '#fee2e2' : 
        currentTodo.priority === 'Medium' ? '#fef3c7' : '#ecfdf5';
    priorityBadge.style.color = 
        currentTodo.priority === 'High' ? '#b91c1c' : 
        currentTodo.priority === 'Medium' ? '#b45309' : '#10b981';

    const indicator = document.getElementById('priority-indicator');
    indicator.style.backgroundColor = 
        currentTodo.priority === 'High' ? '#ef4444' : 
        currentTodo.priority === 'Medium' ? '#f59e0b' : '#10b981';

    // Status badge
    const statusEl = document.getElementById('todo-status');
    statusEl.textContent = currentTodo.status.toUpperCase();
    statusEl.style.backgroundColor = 
        currentTodo.status === 'Done' ? '#ecfdf5' : 
        currentTodo.status === 'In Progress' ? '#dbeafe' : '#f1f5f9';
    statusEl.style.color = 
        currentTodo.status === 'Done' ? '#10b981' : 
        currentTodo.status === 'In Progress' ? '#3b82f6' : '#64748b';

    // Sync status dropdown
    document.getElementById('status-control').value = currentTodo.status;

    // Sync checkbox
    document.getElementById('complete-toggle').checked = currentTodo.status === 'Done';

    // Due date
    const dueEl = document.getElementById('due-date');
    dueEl.textContent = `Due ${currentTodo.dueDate.toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' 
    })}`;

    updateTimeRemaining();
}

// Granular time + overdue
function updateTimeRemaining() {
    const timeEl = document.getElementById('time-remaining');
    const overdueEl = document.getElementById('overdue-indicator');

    if (currentTodo.status === 'Done') {
        timeEl.textContent = ' Completed';
        timeEl.style.color = '#10b981';
        overdueEl.style.display = 'none';
        return;
    }

    const now = new Date();
    const diffMs = currentTodo.dueDate.getTime() - now.getTime();

    let text = '';
    if (diffMs < 0) {
        const overdueMs = Math.abs(diffMs);
        const minutes = Math.floor(overdueMs / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) text = `Overdue by ${days} days`;
        else if (hours > 0) text = `Overdue by ${hours} hours`;
        else text = `Overdue by ${minutes} minutes`;
        
        overdueEl.style.display = 'inline-flex';
    } else {
        const minutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days >= 1) text = `Due in ${days} days`;
        else if (hours >= 1) text = `Due in ${hours} hours`;
        else if (minutes > 0) text = `Due in ${minutes} minutes`;
        else text = 'Due now!';
        
        overdueEl.style.display = 'none';
    }

    timeEl.textContent = text;
    timeEl.style.color = diffMs >= 0 ? '#3b82f6' : '#ef4444';
}

// Expand / Collapse
function toggleExpand() {
    const section = document.getElementById('collapsible-section');
    const btn = document.getElementById('expand-toggle');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        section.style.maxHeight = '110px';
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = `Read more <span style="font-size:18px; line-height:1;">↓</span>`;
    } else {
        section.style.maxHeight = section.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = `Show less <span style="font-size:18px; line-height:1; transform:rotate(180deg);">↓</span>`;
    }
}

// Edit Mode
function enterEditMode() {
    originalTodo = { ...currentTodo };
    document.getElementById('main-view').style.display = 'none';
    const form = document.getElementById('edit-form');
    form.style.display = 'flex';
    
    // Fill form
    document.getElementById('edit-title').value = currentTodo.title;
    document.getElementById('edit-description').value = currentTodo.description;
    document.getElementById('edit-priority').value = currentTodo.priority;
    document.getElementById('edit-due-date').value = currentTodo.dueDate.toISOString().slice(0, 16);
    
    // Return focus to Edit button when closed
    form.querySelector('#cancel-button').focus();
}

function exitEditMode() {
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('edit-button').focus(); // return focus
}

function saveEdit() {
    currentTodo.title = document.getElementById('edit-title').value;
    currentTodo.description = document.getElementById('edit-description').value;
    currentTodo.priority = document.getElementById('edit-priority').value;
    currentTodo.dueDate = new Date(document.getElementById('edit-due-date').value);
    renderCard();
    exitEditMode();
}

// Status sync
function syncStatus(newStatus) {
    currentTodo.status = newStatus;
    renderCard();
}

// Initialize
function initialize() {
    renderCard();

    // Checkbox ↔ Status sync
    document.getElementById('complete-toggle').addEventListener('change', (e) => {
        syncStatus(e.target.checked ? 'Done' : 'Pending');
    });

    document.getElementById('status-control').addEventListener('change', (e) => {
        syncStatus(e.target.value);
    });

    // Expand toggle
    document.getElementById('expand-toggle').addEventListener('click', toggleExpand);

    // Edit / Save / Cancel
    document.getElementById('edit-button').addEventListener('click', enterEditMode);
    document.getElementById('save-button').addEventListener('click', saveEdit);
    document.getElementById('cancel-button').addEventListener('click', () => {
        currentTodo = { ...originalTodo };
        renderCard();
        exitEditMode();
    });

    // Delete
    document.getElementById('delete-button').addEventListener('click', () => {
        if (confirm('Delete this todo?')) {
            alert(' Task deleted!');
        }
    });

    // Live time update every 30 seconds
    setInterval(() => {
        if (currentTodo.status !== 'Done') updateTimeRemaining();
    }, 30000);

    console.log('%c Stage 1a Fully Interactive Todo Card Ready!', 'color:#10b981; font-size:16px; font-weight:700');
}

document.addEventListener('DOMContentLoaded', initialize);