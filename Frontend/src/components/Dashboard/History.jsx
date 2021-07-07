import React, { useContext, useEffect } from 'react';
import '../css/History.css';
import { GlobalContext } from './../../context/GlobalState';
import Transaction from './Transaction';
const History = () => {

    const { transactions, getTransactionData } = useContext(GlobalContext);
    useEffect(() => {
        getTransactionData();
    }, [])


    return (
        <div className="container m-2 border  ">
            <h3 className="text-center">History</h3>
            <ul className="list-group">
                {transactions.map(transaction => <Transaction transaction={transaction} key={transaction._id} />)}
            </ul>
        </div>
    );
}

export default History;