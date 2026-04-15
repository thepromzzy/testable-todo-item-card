# Advanced Todo Card - Stage 1a

**Frontend Wizards Internship • Stage 1a Task**

A fully interactive, stateful, accessible, and responsive Todo Card component built with pure HTML, CSS (Tailwind), and vanilla JavaScript.

---

##  Features

### Stage 0 Requirements (All still fully working)
- All required `data-testid` attributes
- Real checkbox with strike-through on completion
- Live time-remaining (updates every 30 seconds)
- Priority badge
- Due date display
- Edit & Delete buttons
- Fully responsive (320px → 1200px+)
- Semantic HTML & excellent accessibility

### New Stage 1a Enhancements
- **Full Edit Mode** – Click Edit to open inline form
- **Editable fields**: Title, Description, Priority, Due Date
- **Status Control** – Dropdown to change status (Pending / In Progress / Done)
- **Two-way sync** between checkbox, status display, and dropdown
- **Priority Indicator** – Colored top bar that changes based on priority
- **Expandable Description** – Collapses long text with "Read more / Show less"
- **Overdue Indicator** – Red badge + red text when overdue
- **Granular Time Display** – "Due in 45 minutes", "Overdue by 2 hours", etc.
- **Smart Time Behavior** – Stops updating when status is "Done"
- **Keyboard navigation** fully maintained

---

##  What Changed from Stage 0

- Added complete **edit mode** with form (`data-testid="test-todo-edit-form"`)
- Added status dropdown control
- Added priority visual indicator bar
- Added expand/collapse for description
- Added overdue visual indicator
- Improved time logic (more granular + stops on completion)
- Better state management (single source of truth object)
- Enhanced accessibility (ARIA attributes, focus management, labels)

---

##  Design Decisions

- **Inline edit form** instead of modal (keeps it as a single card)
- **Colored top bar** for priority (cleaner than just a badge)
- **Tailwind CSS** via CDN for fast styling and responsiveness
- **UTC date handling** so "Due May 20, 2026" always shows correctly
- **Smooth animations** for expand/collapse and edit mode
- Kept the card clean and modern while meeting every test ID requirement

---

##  Accessibility Notes

- All form fields have proper `<label>` elements
- Expand toggle uses `aria-expanded` and `aria-controls`
- Live time updates use `aria-live="polite"`
- Full keyboard navigation (Tab → Checkbox → Status → Expand → Edit → Delete)
- Focus is returned to Edit button after saving/cancelling
- High contrast colors (WCAG AA compliant)
- Semantic HTML (`<article>`, `<time>`, buttons, labels)

---

##  Known Limitations

- This is a **single card** demo (not a full todo list)
- Edit form does not include tags editing (not required in the task)
- No persistence (data resets on page refresh)
- Focus trapping inside edit form is not implemented (bonus feature)

---

##  How to Run

1. Clone or download the repository
2. Open `index.html` in any modern browser
3. No installation needed!

**Files:**
- `index.html` – Main markup
- `script.js` – All JavaScript logic

---

## Live Demo



---
