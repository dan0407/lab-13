document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('task-input').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    document.getElementById('clear-done-tasks').addEventListener('click', clearDoneTasks);
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = {
        text: taskText,
        status: 'to-do'
    };

    saveTask(task);
    createTaskCard(task);
    taskInput.value = '';
}

function createTaskCard(task) {
    const taskColumn = document.getElementById(task.status);
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.textContent = task.text;
    const button = document.createElement('button');
    button.textContent = 'Cambiar Estado';
    button.addEventListener('click', () => {
        changeTaskStatus(task, taskCard);
    });

    taskCard.appendChild(button);
    taskColumn.appendChild(taskCard);
}

function changeTaskStatus(task, taskCard) {
    if (task.status === 'to-do') {
        task.status = 'doing';
    } else if (task.status === 'doing') {
        task.status = 'done';
    } else {
        return;
    }

    updateTaskStatus(task);
    const taskColumn = document.getElementById(task.status);
    taskColumn.appendChild(taskCard);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((t) => t.text === task.text);
    if (index !== -1) {
        tasks[index].status = task.status;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        createTaskCard(task);
    });
}

function clearDoneTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const remainingTasks = tasks.filter(task => task.status !== 'done');
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));
    const doneColumn = document.getElementById('done');
    doneColumn.innerHTML = `<h2>Hecho (Done)</h2>`;
    remainingTasks.forEach(task => {
        if (task.status === 'done') return;
        createTaskCard(task);
    });
}
