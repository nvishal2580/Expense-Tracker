import { useContext, useEffect } from 'react';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { GoalTrackerContext } from './../../context/GoalTrackerState';
import TransactionInput from './TransactionInput';

const GoalList = ({ goal }) => {
    console.log(goal);

    const { deleteGoal, goalCompleted } = useContext(GoalTrackerContext);

    const { _id, title, amount, startDate, endDate, history, details } = goal;



    useEffect(() => {
        const amt = amountCollected();
        if (amt >= amount) {
            goalCompleted(_id);
        }

    });

    const handleDelete = () => {

        deleteGoal(_id);
    }

    const amountCollected = () => {
        let amt = 0;
        for (let i = 0; i < history.length; i++) {
            amt += history[i].amount;
        }

        return amt;
    }
    const calculatePercentage = () => {
        const amtcl = amountCollected();
        const totalAmount = amount;

        const percentage = (amtcl / totalAmount) * 100;
        return parseInt(percentage);
    }


    const calculateDays = () => {
        var date1 = new Date();
        var date2 = new Date(endDate);
        console.log(date1, date2);
        const DIT = date2.getTime() - date1.getTime();
        const DID = DIT / (1000 * 3600 * 24);
        return parseInt(DID);
    }

    return (
        <div className="col-12 mt-4">
            <Card>
                <Card.Header>
                    <Row>
                        <Col xs={10}><Card.Title>{title}</Card.Title></Col>
                        <Col xs={2}> <button type="button" className="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Remaining Days">350 Days</button></Col>
                    </Row>


                </Card.Header>

                <Card.Body>
                    <div className="row">
                        <div className="col-9">
                            <Card.Text>
                                {details}
                            </Card.Text>
                        </div>
                        <div className="col-3">
                            <button type="button" className="btn" style={{ background: "#b2bec3" }}>
                                <span className="badge badge-light">{calculateDays()}</span> Days Remaining
                            </button>
                        </div>

                    </div>

                    <div className="row m-4">
                        <div className="col-2 ">{`From : ${startDate}`}</div>
                        <div className="col-4">
                            <button type="button" className="btn " style={{ background: "#9c88ff" }}>
                                Amount collected <span className="badge badge-light ">{amountCollected()}</span>
                            </button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn" style={{ background: "#ff7675" }}>
                                Total Amount <span className="badge badge-light">{amount}</span>
                            </button>
                        </div>
                        <div className="col-2">{`To : ${endDate}`}</div>
                    </div>
                    <ProgressBar variant="info" animated now={calculatePercentage()} label={`${calculatePercentage()}%`} />
                    <TransactionInput history={history} handleDelete={handleDelete} id={_id} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default GoalList;