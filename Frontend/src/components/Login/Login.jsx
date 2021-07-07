import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URI = 'http://localhost:5001/login';
const Login = ({ history }) => {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Errors, setErrors] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { Username, Password };
        console.log(user);

        try {
            const { data: token } = await axios.post(URI, user);
            toast.success('Successfully Loged in');
            localStorage.setItem('token', token);
            history.push('/dashboard');


        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errormsg = error.response.data;
                setErrors(errormsg);
                toast.error(error.response.data);
            }

        }

    }

    return (
        <div className="login-form">
            <div className="header">
                Expense Tracker
            </div>
            <div>
                <ToastContainer />
            </div>
            <form onSubmit={handleSubmit} >
                <h2 className="text-center">Log in</h2>
                <div className="form-group">
                    <input type="text" className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
            </form>
            <p className="text-center"><a href="/register">Create an Account</a></p>
        </div>
    );
}

export default withRouter(Login);
