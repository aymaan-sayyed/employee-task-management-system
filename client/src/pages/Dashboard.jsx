import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [editingTask, setEditingTask] = useState(null);

  const getTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks", {
        params: {
          page,
          limit: 10,
          search,
          priority,
          status,
          sortBy: "createdAt",
          order: sort,
        },
      });

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setTotalTasks(res.data.totalTasks);

    } catch (err) {

      if (err.response?.status === 401) {
        logout();
        navigate("/", { replace: true });
        return;
      }

      toast.error(
        err.response?.data?.message ||
          "Unable to fetch tasks"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getTasks();
    }
  }, [
    isAuthenticated,
    page,
    search,
    priority,
    status,
    sort,
  ]);

  const updateTaskInList = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const deleteTask = async (id) => {

    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {

      await API.delete(`/tasks/${id}`);

      toast.success("Task Deleted");

      getTasks();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );

    }
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const toggleTheme = () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    setDarkMode(isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

  };

  // Statistics

  const total = totalTasks;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="container py-4">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">

        <h2 className="fw-bold text-center text-md-start">
          Employee Task Dashboard
        </h2>

        <div className="d-flex flex-wrap justify-content-center">

          <button
            className="btn btn-dark me-2 mb-2"
            onClick={toggleTheme}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button
            className="btn btn-success me-2 mb-2"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

          <button
            className="btn btn-danger mb-2"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="row g-3 mb-4">

        <div className="col-6 col-lg-3">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h6>Total Tasks</h6>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h6>Pending</h6>
              <h2>{pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h6>In Progress</h6>
              <h2>{progress}</h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h6>Completed</h6>
              <h2>{completed}</h2>
            </div>
          </div>
        </div>

      </div>
            <div className="row g-3 mb-4">

        <div className="col-lg-3 col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Task..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>

        <div className="col-lg-3 col-md-6">

          <select
            className="form-select"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        <div className="col-lg-3 col-md-6">

          <select
            className="form-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        <div className="col-lg-3 col-md-6">

          <select
            className="form-select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="desc">
              Newest First
            </option>

            <option value="asc">
              Oldest First
            </option>

          </select>

        </div>

      </div>

      <TaskForm
        onTaskAdded={getTasks}
        editingTask={editingTask}
        onTaskUpdated={updateTaskInList}
      />

      <hr className="my-4" />

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3">
            Loading Tasks...
          </p>

        </div>

      ) : tasks.length === 0 ? (

        <div className="alert alert-info text-center shadow">

          <h5>No Tasks Found</h5>

          <p className="mb-0">
            Create your first task to get started.
          </p>

        </div>

      ) : (

        <>

          <div className="row">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="col-lg-6 mb-3"
              >

                <TaskCard
                  task={task}
                  onDelete={deleteTask}
                  onEdit={startEditing}
                />

              </div>

            ))}

          </div>

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">

            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
            >
              ← Previous
            </button>

            <span className="fw-bold">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              Next →
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Dashboard;