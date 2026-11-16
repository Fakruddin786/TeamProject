// Team Task Management Application
// Developer 2: Implementation of Task Creation Functionality

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const taskCounter = document.getElementById("task-counter");

    // In-memory state for tasks
    let tasks = [];

    // Helper: Update task count badge
    function updateCounter() {
        const count = tasks.length;
        taskCounter.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
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

            const taskContent = document.createElement("div");
            taskContent.className = "task-content";

            const titleSpan = document.createElement("span");
            titleSpan.className = "task-text";
            titleSpan.textContent = task.text;
            taskContent.appendChild(titleSpan);

            li.appendChild(taskContent);
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

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });

    // Make tasks array and render function accessible globally for subsequent feature modules
    window.taskApp = {
        getTasks: () => tasks,
        setTasks: (newTasks) => { tasks = newTasks; renderTasks(); },
        renderTasks: renderTasks
    };
});
