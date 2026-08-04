import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    location: ""   // ✅ match backend field directly
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred), // ✅ cleaner, no manual mapping
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        alert("Something went wrong!");
        return;
      }

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        alert("Signup Successful!");
        navigate("/login"); // ✅ redirect after signup
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={cred.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={cred.email}
            onChange={onChange}
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={cred.password}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="location"   // ✅ changed from geolocation → location
            value={cred.location}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
  );
}

export default Signup;
