import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/", { replace: true });
        return;
      }

      toast.error(
        err.response?.data?.message || "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-6 col-md-8">

          <div className="card shadow-lg border-0">

            <div
              className="card-header text-center text-white"
              style={{
                background:
                  "linear-gradient(135deg,#0d6efd,#6610f2)"
              }}
            >
              <div
                className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: "90px",
                  height: "90px",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h3>{user.name}</h3>

              <p className="mb-0">
                Employee Task Manager
              </p>
            </div>

            <div className="card-body p-4">

              <div className="mb-4">
                <h6 className="text-muted">
                  Full Name
                </h6>

                <h5>{user.name}</h5>
              </div>

              <hr />

              <div className="mb-4">
                <h6 className="text-muted">
                  Email Address
                </h6>

                <h5>{user.email}</h5>
              </div>

              <hr />

              <div className="mb-4">
                <h6 className="text-muted">
                  Member Since
                </h6>

                <h5>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </h5>
              </div>

              <div className="d-grid gap-2">

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  ← Back to Dashboard
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;