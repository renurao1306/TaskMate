import Task from "../models/task.js";

// add a task
const addTask = async (req, res) => {
    try {
        const { title, status } = req.body;
        const taskCreated = await Task.create({ title, status, user: req.loggedInUser._id });
        if (taskCreated) {
            return res.status(201).json(taskCreated);
        }
    } catch (error) {
        console.log(`Error while adding a task ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

// get tasks for a particular user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.loggedInUser._id });
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(`Error while trying to fetch tasks ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

// edit a task
const editTask = async (req, res) => {
    try {
        const { title, status } = req.body;
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, user: req.loggedInUser._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found for update' });
        }

        task.title = title;
        task.status = status;
        await task.save();

        return res.status(200).json(task);
    } catch (error) {
        console.log(`Error while editing task: ${error.message}`);

    }
}


//delete task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id: id, user: req.loggedInUser._id});

        if(!task){
            return res.status(404).json({message: 'Task to delete not found'});
        }

        await task.deleteOne(task);
        return res.status(200).send('Task deleted successfully');
    } catch (error) {
        console.log(`Error while deleting a task: ${error.message}`);
        return res.status(500).json({ message: `Error while deleting a task: ${error.message}`});
    }
}

export default { addTask, getTasks, editTask, deleteTask }