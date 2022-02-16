import { React, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const AddBooks = (props) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="modalHead">
                <Modal.Title className="modalTitle">Add Books Details</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form method='Post'>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Book Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter Book Name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Author Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter Author Name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Quantity</Form.Label>
                    </div>
                    <Form.Control type="number" placeholder="Add Quantity" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group> <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Price (&#8377;)</Form.Label>
                    </div>
                    <Form.Control type="number" placeholder="Enter Book Price" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>
            </Form><br/>
                <div className="modalButton">
                    <Button className='button' variant="primary">Submit</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default AddBooks;