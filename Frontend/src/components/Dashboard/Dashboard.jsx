import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardData from './dashboardData';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import GoalTracker from './../GoalTracker/GoalTracker';
import { GoalTrackerGlobalProvider } from '../../context/GoalTrackerState';


function isAuthenticate() {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <GoalTracker />
    ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
}
const Dashboard = () => {
    return (
        <GoalTrackerGlobalProvider>
            <div className=".container ">
                <Navbar />
                <Route path="/dashboard" component={DashboardData} />
                <Route path="/goaltracker" component={GoalTracker} />

            </div>
        </GoalTrackerGlobalProvider>
    );
}

export default Dashboard;