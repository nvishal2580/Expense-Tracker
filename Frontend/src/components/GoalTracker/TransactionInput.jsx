import { useState, useContext } from 'react';
import HistoryList from './HistoryList';
import { toast } from 'react-toastify';
import { GoalTrackerContext } from './../../context/GoalTrackerState';
import { v4 as uuidv4 } from 'uuid';

const TransactionInput = ({ history, handleDelete, id }) => {
    const { updateGoal } = useContext(GoalTrackerContext);
    const [amount, setAmount] = useState(0);
    const handleSubmit = () => {
        if (amount === 0) {
            toast.error('Amount must be non Zero ');
            return;
        }
        const data = {
            amount: parseInt(amount),
            date: new Date().toLocaleDateString(),
            _id: uuidv4()
        }
        updateGoal(id, data);
    }
    return (
        <div className="row mt-4">

            <div className="col-4">
                <input type="number" onChange={(e) => setAmount(e.target.value)} className="form-control" placeholder="Add amount" />
            </div>
            <div className="col-2">
                <button onClick={handleSubmit} className="btn btn-primary" >ADD</button>
            </div>
            <div className="col-4">

                <HistoryList history={history} />
            </div>
            <div className="col-2 ">
                <button onClick={handleDelete} className="btn btn-danger ">End Goal</button>
            </div>
        </div>
    );
}

export default TransactionInput;