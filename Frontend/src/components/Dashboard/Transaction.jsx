import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    function handleBadgeClass(transaction) {
        let badgeClass = "p-2 badge badge-"
        badgeClass += transaction.amount > 0 ? "success" : "danger";
        return badgeClass;
    }

    function formateDate(date) {
        return new Date(date).toLocaleDateString();
    }


    return (
        <li className="list-group-item d-flex justify-content-between align-items-center mybtnclass" key={transaction._id}>
            {transaction.title}
            <span className="hide bg-white text-dark">{formateDate(transaction.date)}</span>
            <button className="btn btn-sm mybtnclass" onClick={() => deleteTransaction(transaction._id)}><span className="hide">X</span></button>
            <span className={handleBadgeClass(transaction)}>{transaction.amount}</span>
        </li>
    );
}

export default Transaction;