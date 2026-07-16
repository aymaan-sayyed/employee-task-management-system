import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};