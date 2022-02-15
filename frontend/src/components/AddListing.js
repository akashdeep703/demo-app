import { React, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const Addlisting = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <Modal
            {...props}
            onhide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Listing</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form method='Post'>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group> <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group> <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Name</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text align="left" className="text-danger">
                    </Form.Text>
                </Form.Group>                 
                <div align="left">
                    <Button variant="primary" type="submit" className='button'>
                        Submit
                    </Button>
                </div>              
            </Form></Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} align="center">
                    Save Changes
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};
  export default Addlisting;