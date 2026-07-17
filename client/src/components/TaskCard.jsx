function TaskCard({ task, onDelete, onEdit }) {
  const badgeColor = {
    High: "danger",
    Medium: "warning",
    Low: "success",
  };

  const statusColor = {
    Pending: "secondary",
    "In Progress": "primary",
    Completed: "success",
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">

          <h4>{task.title}</h4>

          <span className={`badge bg-${badgeColor[task.priority]}`}>
            {task.priority}
          </span>

        </div>

        <p className="mt-3 text-muted">
          {task.description}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          <span className={`badge bg-${statusColor[task.status]}`}>
            {task.status}
          </span>
        </p>

        <p>
          <strong>Due Date :</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>

        <div className="d-flex gap-2 mt-3">

          <button
            className="btn btn-warning"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskCard;