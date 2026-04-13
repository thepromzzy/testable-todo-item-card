// script.js
// Fixed due date (May 20, 2026)
const DUE_DATE = new Date('2026-05-20T23:59:59Z')

function formatDueDate(date) {
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    return `${month} ${day}, ${year}`
}

// Calculate friendly time remaining or overdue status
function getTimeRemaining(due) {
    const now = new Date()
    const diffMs = due.getTime() - now.getTime()
    
    if (diffMs < 0) {
        const overdueMs = Math.abs(diffMs)
        const hours = Math.floor(overdueMs / (1000 * 60 * 60))
        const days = Math.floor(overdueMs / (1000 * 60 * 60 * 24))
        
        if (days > 0) return `Overdue by ${days} days`
        if (hours > 0) return `Overdue by ${hours} hours`
        return 'Overdue!'
    }
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days >= 2) return `Due in ${days} days`
    if (days === 1) return 'Due tomorrow'
    if (hours >= 1) return `Due in ${hours} hours`
    return 'Due now!'
}

// Update time remaining display
function updateTimeRemaining() {
    const timeEl = document.getElementById('time-remaining')
    if (!timeEl) return
    timeEl.textContent = getTimeRemaining(DUE_DATE)
}

// Handle checkbox toggle
function handleCheckboxToggle(e) {
    const title = document.getElementById('todo-title')
    const status = document.getElementById('todo-status')
    const isChecked = e.target.checked
    
    if (isChecked) {
        title.classList.add('strike-through')
        status.textContent = 'DONE'
        status.className = 'px-4 py-1 text-xs font-semibold rounded-2xl bg-emerald-100 text-emerald-700 flex items-center'
    } else {
        title.classList.remove('strike-through')
        status.textContent = 'PENDING'
        status.className = 'px-4 py-1 text-xs font-semibold rounded-2xl bg-slate-100 text-slate-600 flex items-center'
    }
}

// Edit button handler
function handleEdit() {
    console.log('%c Edit button clicked - task would open in edit modal', 'color: #3b82f6; font-weight: 600')
    alert('🖊️ Edit mode opened! (In a real app this would show a form)')
}

// Delete button handler
function handleDelete() {
    console.log('%c Delete button clicked - task would be removed', 'color: #ef4444; font-weight: 600')
    
    if (confirm('Delete this todo?')) {
        const card = document.querySelector('[data-testid="test-todo-card"]')
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 1, 1)'
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        
        setTimeout(() => {
            alert(' Task deleted! (Card removed in real app)')
            card.style.transition = ''
            card.style.opacity = '1'
            card.style.transform = ''
        }, 400)
    }
}

// Initialize the entire card
function initializeTodoCard() {
    // Set due date using UTC formatting (now always shows May 20)
    const dueDateEl = document.getElementById('due-date')
    if (dueDateEl) {
        dueDateEl.textContent = `Due ${formatDueDate(DUE_DATE)}`
    }
    
    // Initial time remaining
    updateTimeRemaining()
    
    // Live update every 60 seconds
    setInterval(updateTimeRemaining, 60000)
    
    // Checkbox
    const checkbox = document.getElementById('complete-toggle')
    if (checkbox) {
        checkbox.addEventListener('change', handleCheckboxToggle)
    }
    
    // Edit button
    const editBtn = document.getElementById('edit-button')
    if (editBtn) {
        editBtn.addEventListener('click', handleEdit)
    }
    
    // Delete button
    const deleteBtn = document.getElementById('delete-button')
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDelete)
    }
    
    console.log('%c Testable Todo Card initialized successfully!', 'color: #3b82f6; font-size: 16px; font-weight: 700')
    console.log('Due date now correctly shows May 20 in every timezone')
}

// Run when the page is fully loaded
document.addEventListener('DOMContentLoaded', initializeTodoCard)