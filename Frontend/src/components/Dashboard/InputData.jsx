import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

import { toast, ToastContainer } from 'react-toastify';

const InputData = () => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);

    const context = useContext(GlobalContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        const newTransaction = {
            _id: uuidv4(),
            title,
            amount: parseFloat(amount),
            date: date
        }
        if (newTransaction.amount === 0) {
            toast.info("amount : 0 is not valid !");
        } else {
            context.addTransacton(newTransaction);
        }


    }

    return (
        <div className="container border m-2 p-2 text-center">
            <ToastContainer />
            <h2>Add Transition</h2>
            <p>*(+ve for income , -ve for expense)</p>
            <form className="form-inline" onSubmit={handleSubmit}  >
                <div className="form-group m-1">
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Enter Title" required="true" />
                </div>
                <div className="form-group m-1">
                    <input type="number" onChange={(e) => setAmount(e.target.value)} className="form-control" placeholder="Enter Amount" required="true" />
                </div>
                <button type="submit" className="btn btn-primary m-2">ADD</button>
            </form>
        </div>
    );
}

export default InputData;