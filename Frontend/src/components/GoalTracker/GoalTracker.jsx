import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoalCount from './GoalCount';
import AddGoalInput from './AddGoalInput';
import GoalList from './GoalList';
import { GoalTrackerContext } from './../../context/GoalTrackerState';
import { ToastContainer } from 'react-toastify';
const GoalTracker = () => {
    const { goals } = useContext(GoalTrackerContext);

    const [localGoals, setLocalGoals] = useState([]);


    const filterGoals = (e) => {
        console.log('function called');
        const name = e.target.name;
        let filered;
        if (name === "Completed") {
            filered = goals.filter(goal => goal.isCompleted === true);
        } else {
            filered = goals.filter(goal => goal.isCompleted === false);
        }
        setLocalGoals(filered);
    }

    return (

        <div className="container mt-4">
            <ToastContainer />
            <div className="row">
                <div className="col-4 text-center"><GoalCount filterGoals={filterGoals} title="Total" count={filterGoals.length} /></div>
                <div className="col-4 text-center"><GoalCount filterGoals={filterGoals} title="Completed" count="2" /></div>
                <div className="col-4 text-center"><AddGoalInput /></div>
            </div>
            <div className="row">
                {localGoals.map(goal =>
                    <GoalList goal={goal} />
                )}
            </div>
        </div>


    );
}

export default GoalTracker;