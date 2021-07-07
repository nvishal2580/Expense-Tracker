import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import GoalList from './../components/GoalTracker/GoalList';
import { toast } from 'react-toastify';

const ACTIONS = {
    ADD_GOAL: "add goal",
    DELETE_GOAL: "delete goal",
    UPDATE_GOAL: "update goal"
}

const initialState = {
    goals: [
        {
            _id: 12345,
            title: "first Goal",
            amount: 5000,
            startDate: "2/10/2021",
            endDate: "12/10/2021",
            isCompleted: false,
            details: "This is first goal",
            history: [
                { date: "3/10/2021", amount: 500 },
                { date: "5/10/2021", amount: 1500 }
            ]
        },
        {
            _id: 12346,
            title: "Second Goal",
            amount: 2200,
            startDate: "4/10/2021",
            endDate: "12/10/2021",
            isCompleted: true,
            details: "This is second goal",
            history: [
                { date: "3/10/2021", amount: -300 },
                { date: "5/10/2021", amount: 700 }
            ]
        }
    ]
}

export const GoalTrackerContext = createContext(initialState);

const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_GOAL:
            return {
                ...state,
                goals: [action.payload, ...state.goals]
            }
        case ACTIONS.DELETE_GOAL:
            return {
                ...state,
                goals: action.payload
            }
        case ACTIONS.UPDATE_GOAL:
            return {
                ...state,
                goals: action.payload
            }
        default:
            return state;
    }

}

export const GoalTrackerGlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addGoal(goal) {
        toast.success('goal added');
        dispatch({
            type: ACTIONS.ADD_GOAL,
            payload: goal
        })
    }

    function deleteGoal(id) {

        let newGoals = state.goals.filter(goal => goal._id !== id);
        toast.info('Goal deleted !');
        dispatch({
            type: ACTIONS.DELETE_GOAL,
            payload: newGoals
        })
    }

    function updateGoal(id, data) {

        let newGoals = state.goals;
        console.log(newGoals);
        const currentGoal = newGoals.filter(goal => goal._id === id)[0];
        const index = newGoals.indexOf(currentGoal);
        let history = [data, ...newGoals[index].history]
        newGoals[index].history = history;



        console.log(newGoals);
        dispatch({
            type: ACTIONS.UPDATE_GOAL,
            payload: newGoals
        })
    }

    function goalCompleted(id) {
        let newGoals = state.goals;
        const currentGoal = newGoals.filter(goal => goal._id === id)[0];
        const index = newGoals.indexOf(currentGoal);
        newGoals[index].isCompleted = true;
        dispatch({
            type: ACTIONS.UPDATE_GOAL,
            payload: newGoals
        })

    }

    return (<GoalTrackerContext.Provider value={{
        goals: state.goals,
        addGoal,
        deleteGoal,
        updateGoal,
        goalCompleted
    }}>
        { children}
    </GoalTrackerContext.Provider>)
}