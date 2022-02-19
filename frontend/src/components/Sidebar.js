import React, { useState } from "react";
import './header.css';
import logo from '../images/logo.png'
import { Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import Addlisting from "./AddBooks";
import { Modal, Button } from "react-bootstrap";
const Sidebar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = useState(false);
    const user = localStorage.getItem('user');
    const redirect = useHistory();
    const handleDashboard = () => {
        redirect.push("/dashboard");
    };
    const handleBooks = () => {
        setModalShow(true);
    };
    const handleProfile = () => {
        redirect.push("/profile");
    };
    const handlelogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('usertype');
        redirect.push("/");
    };
    return (
        <div>
            <div className='headerContainer'>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "13px" }}>
                    <div style={{ marginLeft: "20px" }}>
                        <h6><img src={logo} height="35px"></img> &nbsp;&nbsp;&nbsp;Welcome {user}</h6>
                    </div>
                    <div>
                        <input
                            type="text"
                            // onKeyDown={(e) => searchBooks(e)}
                            placeholder="Search by Book Name, Author name"
                            style={{
                                width: "350px",
                                borderRadius: "8px",
                                borderColor: "black",
                                fontWeight: "bold",
                                justifyContent: 'end'
                            }}
                        />
                    </div>

                </div>
            </div>
            <div className='mainContainer'>
                <div className='sideBar'>
                    <div className="sideBarPanel">
                        <div className="ButtonPanel">
                            <button className="ButtonStyle-1" onClick={() => handleDashboard()}>
                                <i className="bi bi-card-heading"></i> &nbsp; Dashboard
                            </button>
                            <button className="ButtonStyle" onClick={() => handleBooks()}>
                                <i className="bi bi-journal-code"></i> &nbsp; Add Books
                            </button>
                            <button className="ButtonStyle" onClick={() => handleProfile()}>
                                <i className="bi bi-person-fill"></i> &nbsp; User Info
                            </button>
                            <button className="ButtonStyle" onClick={handlelogout}>
                                <i className="bi bi-box-arrow-in-right"></i> &nbsp; Log Out
                            </button>
                            <Addlisting show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                            <Modal size="sm"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered show={show} onHide={handleClose}>
                                <Modal.Header className="modalHead">
                                </Modal.Header>
                                <Modal.Body>Are you sure to delete this Book ?</Modal.Body>
                                <div className="modalButtonDel">
                                    <Button variant="danger" onClick={handleClose}>Delete</Button>
                                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className='tableContent'>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>1</td>
                                <td>12-12-2022</td>
                                <td><a className="edit_delete" onClick={() => handleBooks()}>Edit</a>
                                    <span className="bar">|</span>
                                    <a className="edit_delete" onClick={handleShow}>Delete</a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>1</td>
                                <td>12-12-2022</td>
                                <td><a className="edit_delete" onClick={() => handleBooks()}>Edit</a>
                                    <span className="bar">|</span>
                                    <a className="edit_delete" onClick={handleShow}>Delete</a></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>1</td>
                                <td>12-12-2022</td>
                                <td><a className="edit_delete" onClick={() => handleBooks()}>Edit</a>
                                    <span className="bar">|</span>
                                    <a className="edit_delete" onClick={handleShow}>Delete</a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>1</td>
                                <td>12-12-2022</td>
                                <td><a className="edit_delete" onClick={() => handleBooks()}>Edit</a>
                                    <span className="bar">|</span>
                                    <a className="edit_delete" onClick={handleShow}>Delete</a></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );
};
export default Sidebar;