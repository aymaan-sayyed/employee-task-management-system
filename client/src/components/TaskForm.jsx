import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function TaskForm({
  onTaskAdded,
  editingTask,
  onTaskUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        const res = await API.put(
          `/tasks/${editingTask._id}`,
          formData
        );

        toast.success("Task Updated Successfully");

        onTaskUpdated(res.data.task);
      } else {
        const res = await API.post(
          "/tasks",
          formData
        );

        toast.success("Task Added Successfully");

        onTaskAdded(res.data.task);
      }

      clearForm();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">

        <h3 className="mb-3">
          {editingTask
            ? "Edit Task"
            : "Add New Task"}
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Priority
              </label>

              <select
                className="form-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Due Date
              </label>

              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className={`btn ${
              editingTask
                ? "btn-warning"
                : "btn-primary"
            }`}
          >
            {editingTask
              ? "Update Task"
              : "Add Task"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default TaskForm;