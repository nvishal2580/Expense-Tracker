import React, { useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const PlotData = () => {


    const [select, setSelect] = useState("saving");
    const { transactions } = useContext(GlobalContext);


    let localLabal = [];
    let localData = [];
    let localTitle = [];
    transactions.map(transaction => {
        const date = new Date(transaction.date).toLocaleDateString();
        localLabal.push(date);
        localData.push(transaction.amount);
        localTitle.push(transaction.title);
    });



    localData.reverse();
    localLabal.reverse();
    let currentBalance = [];
    let i;
    let amount = 0;
    for (i = 0; i < localData.length; i++) {

        var value = localData[i];
        amount += value;

        currentBalance.push(amount);
    }

    const data = {
        labels: localLabal,
        datasets: [
            {
                label: 'Saving',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#007BFF',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#007BFF',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#007BFF',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: currentBalance
            }

        ]
    };
    let incomeLabal = [];
    let localIncomeData = [];
    let expenseLabel = [];
    let localExpenseData = [];
    amount = 0;
    let amt = 0;
    for (let i = 0; i < localData.length; i++) {
        if (localData[i] > 0) {
            var value = localData[i];
            incomeLabal.push(localLabal[i]);
            amount += value;
            localIncomeData.push(amount);
        } else {
            var value = localData[i] * (-1);
            expenseLabel.push(localLabal[i]);
            amt += value;
            localExpenseData.push(amt);
        }
    }

    const incomeData = {
        labels: incomeLabal,
        datasets: [
            {
                label: 'income',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#28A745',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#28A745',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#28A745',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: localIncomeData
            }

        ]
    };
    const expenseData = {
        labels: expenseLabel,
        datasets: [
            {
                label: 'expense',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#DC3545',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#DC3545',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#DC3545',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: localExpenseData
            }

        ]
    };


    function getCurve() {
        if (select === "saving") {
            if (localData.length > 0) {
                return (
                    <Line
                        data={data}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                    />
                );
            }
        } else if (select === "income") {
            if (localIncomeData.length > 0) {
                return (
                    <Line
                        data={incomeData}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                    />
                );
            }
        } else {
            if (localExpenseData.length > 0) {
                return (
                    <Line
                        data={expenseData}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                    />
                );
            }
        }

    }

    function handleSelect(e) {
        const res = e.target.getAttribute("value");
        setSelect(res);
    }

    return (
        <>
            <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginLeft: "225px" }}>
                    {select}
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" onClick={handleSelect} value="saving" >saving</a>
                    <a class="dropdown-item" onClick={handleSelect} value="income" >income</a>
                    <a class="dropdown-item" onClick={handleSelect} value="expense" >expense</a>
                </div>
            </div>
            <div style={{ width: "540px", height: "450px" }}>{getCurve()}</div>
        </>
    );
}

export default PlotData;