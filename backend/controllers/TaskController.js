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
        const tasks = await Task.find({user: req.loggedInUser._id});
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(`Error while trying to fetch tasks ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export default { addTask, getTasks }