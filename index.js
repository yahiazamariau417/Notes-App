const fs = require('fs');
const fileName = 'tasks.json';

function saveTasks(tasks) {
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
}

function loadTasks() {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function addTask(taskDescription) {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description: taskDescription
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Task added:', newTask.description);
}

function listTasks() {
    const tasks = loadTasks();
    tasks.forEach(task => {
        console.log(`${task.id}: ${task.description}`);
    });
}

function deleteTask(taskId) {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(filteredTasks);
    console.log('Task deleted:', taskId);
}

function main() {
    const command = process.argv[2];
    const args = process.argv.slice(3);

    switch (command) {
        case 'add':
            addTask(args.join(' '));
            break;
        case 'list':
            listTasks();
            break;
        case 'delete':
            const taskId = parseInt(args[0]);
            deleteTask(taskId);
            break;
        default:
            console.log('Unknown command. Use add, list, or delete.');
    }
}

main();
