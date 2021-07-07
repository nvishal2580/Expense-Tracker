import React, { useState, useContext } from 'react';
import AccountData from './AccountData';
import Card from './card';
import InputData from './InputData';
import History from './History';
import { GlobalContext } from './../../context/GlobalState';
import { computeIncome, computeExpense, totalAmount } from './compute';
import PlotData from './PlotData';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardData = () => {

    const { transactions } = useContext(GlobalContext);

    return (<div className="container mt-4 border">
        <div className="row">
            <div className="col-2">
                < Card title="Saving" amount={totalAmount(transactions)} colour="primary" />
            </div>
            <div className="col-2">
                < Card title="Income" amount={computeIncome(transactions)} colour="success" />
            </div>
            <div className="col-2">
                < Card title="Expense" amount={computeExpense(transactions)} colour="danger" />
            </div>
            <div className="col-6"><InputData /></div>

        </div>
        <div className="row">
            <div className="col-6">
                <PlotData />

            </div>
            <div className="col-6"><History /></div>

        </div>
    </div>);
}

export default DashboardData;