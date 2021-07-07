import { useState } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
function MydModalWithGrid(props) {
    const { history } = props;
    const formateClass = (amount) => {
        let cls = "badge badge-";
        if (amount >= 0) cls += "success";
        else cls += "danger";

        return cls;
    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Transactions History
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <ul>
                        {history.map(data => <li class="list-group-item d-flex justify-content-between align-items-center">
                            {data.date}
                            <span className={formateClass(data.amount)} >{data.amount}</span>
                        </li>)}
                    </ul>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const HistoryList = ({ history }) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="outline-secondary" onClick={() => setModalShow(true)}>
                Show History
        </Button>

            <MydModalWithGrid show={modalShow} history={history} onHide={() => setModalShow(false)} />
        </>
    );
}

export default HistoryList;