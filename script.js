// Team Task Management Application
// Developer 2 & Developer 3: Task Creation and Task Completion Functionality

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const taskCounter = document.getElementById("task-counter");

    // In-memory state for tasks
    let tasks = [];

    // Helper: Update task count badge with active vs completed statistics
    function updateCounter() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        if (total === 0) {
            taskCounter.textContent = "0 tasks";
        } else {
            taskCounter.textContent = `${completed}/${total} completed`;
        }
    }

    // Render task items to DOM
    function renderTasks() {
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "empty-state";
            emptyLi.textContent = "No tasks available. Add one above!";
            taskList.appendChild(emptyLi);
            updateCounter();
            return;
        }

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;
            li.setAttribute("data-id", task.id);

            // Completion checkbox (Developer 3)
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Mark task completed");
            checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

            const taskContent = document.createElement("div");
            taskContent.className = "task-content";

            const titleSpan = document.createElement("span");
            titleSpan.className = "task-text";
            titleSpan.textContent = task.text;
            taskContent.appendChild(titleSpan);

            // Action buttons container
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "task-actions";

            // Status label badge
            const statusBadge = document.createElement("span");
            statusBadge.className = `status-pill ${task.completed ? "status-done" : "status-pending"}`;
            statusBadge.textContent = task.completed ? "Done" : "Pending";
            actionsDiv.appendChild(statusBadge);

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-delete";
            deleteBtn.innerHTML = "&times;";
            deleteBtn.setAttribute("title", "Delete Task");
            deleteBtn.addEventListener("click", () => deleteTask(task.id));
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(checkbox);
            li.appendChild(taskContent);
            li.appendChild(actionsDiv);
            taskList.appendChild(li);
        });

        updateCounter();
    }

    // Task Creation Handler (Developer 2)
    function addTask(text) {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newTask = {
            id: Date.now().toString(),
            text: trimmed,
            completed: false,
            createdAt: new Date().toLocaleTimeString()
        };

        tasks.push(newTask);
        renderTasks();
        taskInput.value = "";
        taskInput.focus();
    }

    // Task Completion Toggle Handler (Developer 3)
    function toggleTaskCompletion(taskId) {
        tasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    }

    // Task Deletion Handler
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });

    // Global exposure for testing or extensions
    window.taskApp = {
        getTasks: () => tasks,
        setTasks: (newTasks) => { tasks = newTasks; renderTasks(); },
        addTask: addTask,
        toggleTaskCompletion: toggleTaskCompletion,
        renderTasks: renderTasks
    };
});
