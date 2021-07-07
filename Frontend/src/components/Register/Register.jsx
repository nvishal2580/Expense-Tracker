import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login/Login.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const URI = 'http://localhost:5001/users';
const Register = ({ history }) => {

    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Errors, setErrors] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        const user = { Username, Email, Password };
        try {
            const { data: token } = await axios.post(URI, user);
            localStorage.setItem('token', token);
            history.push('/dashboard');

        } catch (error) {
            toast.error(error.response.data);

        }

    }

    return (
        <div className="login-form">
            <ToastContainer />
            <form onSubmit={submitForm}>
                <h2 className="text-center">Join Expense Tracker</h2>
                <div className="form-group">
                    <input type="text" className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
            </form>
            <p className="text-center"><a href="/login">Already account ! login here</a></p>
        </div>
    );
}

export default withRouter(Register);