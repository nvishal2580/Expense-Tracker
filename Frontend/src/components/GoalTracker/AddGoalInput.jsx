import React, { useState, useContext } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { GoalTrackerContext } from './../../context/GoalTrackerState';
import { v4 as uuidv4 } from 'uuid';
function MydModalWithGrid(props) {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [amount, setAmount] = useState(0);
    const [endDate, setEndDate] = useState("");


    const { addGoal } = useContext(GoalTrackerContext);

    const handleChange = (e) => {
        if (e.target.name === "title") setTitle(e.target.value);
        else if (e.target.name === "details") setDetails(e.target.value);
        else if (e.target.name === "amount") setAmount(e.target.value);
        else if (e.target.name === "endDate") setEndDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDate = new Date();
        const d = new Date(endDate).toLocaleDateString();

        const date1 = Date.parse(startDate);
        const date2 = Date.parse(d);

        if (date2 > date1) console.log('you are in future');
        else console.log('bro its past');

        const form = {
            _id: uuidv4(), title, details, isCompleted: false, amount, endDate: new Date(endDate).toLocaleDateString(), history: [], startDate: startDate.toLocaleDateString()
        }
        console.log(form);
        addGoal(form);
        props.onHide();

    }



    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Goal
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label >Title</label>
                            <input type="text" onChange={handleChange} class="form-control" name="title" required placeholder="Enter title" />
                        </div>
                        <div class="form-group">
                            <label >Details</label>
                            <input type="text" onChange={handleChange} class="form-control" name="details" placeholder="Enter details" />
                        </div>
                        <div class="form-group">
                            <label >Amount</label>
                            <input type="number" onChange={handleChange} class="form-control" name="amount" required placeholder="Enter amount" />
                        </div>
                        <div class="form-group">
                            <label >End Date</label>
                            <input type="date" onChange={handleChange} class="form-control" name="endDate" required placeholder="Enter end date" />
                        </div>
                        <Modal.Footer>
                            <Button onClick={props.onHide}>Close</Button>
                            <Button type="submit" className="btn btn-success">Add</Button>
                        </Modal.Footer>
                    </form>
                </Container>
            </Modal.Body>

        </Modal>
    );
}
const AddGoalInput = () => {

    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button variant="outline-dark" onClick={() => setModalShow(true)}>
                Add New Goal
            </Button>

            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

export default AddGoalInput;