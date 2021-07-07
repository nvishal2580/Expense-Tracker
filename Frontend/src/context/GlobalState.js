import axios from 'axios';
import React, { createContext, useReducer, useEffect } from 'react';

const URI = "http://localhost:5001/dashboard/";

function getToken() {
    const token = localStorage.getItem('token');
    // console.log(token);
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI5MDEyZGI4MmY3MjM4NTQ5NmU1MjQiLCJVc2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjEzMzAxOTI4fQ.2ETq97uRc3JSSQ67lXo1JV3tKSX4B8wgreNY2aaP7H0";

    return token;
}


const initialState = {
    transactions: [

    ]
}

export const ACTIONS = {
    DELETE_TRANSACTION: "delete-transaction",
    ADD_TRANSACTION: "add-transaction",
    GET_TRANSACTIONS: "get-transactions"
}

const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        case ACTIONS.DELETE_TRANSACTION:
            return {
                ...state,
                transactions: action.payload
            }
        case ACTIONS.ADD_TRANSACTION:
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state;
    }
}


export const GlobalContext = createContext({ initialState });

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function deleteTransaction(id) {
        const newURI = URI + `${id}`;

        try {
            const { data } = await axios.delete(newURI, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            console.log(data);
            dispatch({
                type: ACTIONS.DELETE_TRANSACTION,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }



    }

    async function addTransacton(transaction) {
        console.log(transaction);
        try {
            const { data } = await axios.post(URI, transaction, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            console.log(data);
            dispatch({
                type: ACTIONS.ADD_TRANSACTION,
                payload: data
            })
        } catch (error) {

        }

    }

    async function getTransactionData() {
        try {
            const { data } = await axios.get(URI, {
                headers: {
                    'x-auth-token': getToken()
                }
            })
            console.log('data', data);
            dispatch({
                type: ACTIONS.GET_TRANSACTIONS,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransacton,
        getTransactionData
    }}>
        {children}
    </GlobalContext.Provider>)
}