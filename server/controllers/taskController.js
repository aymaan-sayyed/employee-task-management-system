import Task from "../models/Task.js";

// =======================
// Create Task
// =======================
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Due date validation
    if (new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "Due date cannot be in the past",
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

// =======================
// Get All Tasks
// =======================
export const getTasks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      priority,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {
      user: req.user.id,
    };

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter
    if (priority) {
      query.priority = priority;
    }

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get Single Task
// =======================
export const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update Task
// =======================
export const updateTask = async (req, res) => {
  try {
    const { dueDate } = req.body;

    if (dueDate) {
      if (new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
        return res.status(400).json({
          message: "Due date cannot be in the past",
        });
      }
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Delete Task
// =======================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};