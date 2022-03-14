import React, { useState, useEffect } from "react";
import './header.css';
import logo from '../images/logo.png'
import { Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import Addlisting from "./AddBooks";
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { logout } from "../actions/authActions";
import { getbooks, deletebook, getbook } from "../actions/bookActions";
export function Sidebar(props) {
    useEffect(() => {
        props.getbooks();
    }, []);
    const [show, setShow] = useState(false);
    var count = 0;
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
    const updateBook = id => {
        props.getbook(id);
        setModalShow(true);
    };
    const handleProfile = () => {
        redirect.push("/profile");
    };
    const onDeleteCilck = async (id) => {
        await props.deletebook(id);
        setShow(false);
        props.getbooks();
    };
    const handlelogout = (e) => {
        props.logout();
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

                        </div>
                    </div>
                </div>
                <div className='tableContent'>
                    <Table striped bordered hover>
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
                        {props.isAuthenticated && props.book.books.length != 0 ? <tbody>
                            {props.book.books.map(({ _id, bookname, authorname, quantity, price, created }) => (
                                <tr key={_id}>
                                    <td>{count = count + 1}</td>
                                    <td>{bookname}</td>
                                    <td>{authorname}</td>
                                    <td>{quantity}</td>
                                    <td>{price}</td>
                                    <td>{created.split('T')[0]}</td>
                                    <td><a className="edit_delete" onClick={() => updateBook({ _id })}>Edit</a>
                                        <span className="bar">|</span>
                                        <a className="edit_delete" onClick={handleShow}>Delete</a></td>
                                    <Modal size="sm"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered show={show} onHide={handleClose}>
                                        <Modal.Header className="modalHead">
                                        </Modal.Header>
                                        <Modal.Body>Are you sure to delete this Book ?</Modal.Body>
                                        <div className="modalButtonDel">
                                            <Button variant="danger" onClick={() => onDeleteCilck({ _id })}>Delete</Button>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        </div>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody> : <tbody><tr>
                            <td colSpan={7}>No Records</td></tr></tbody>}
                    </Table>
                </div>
            </div>

        </div>
    );
};
const mapStateToProps = (state) => {
    return ({
        book: state.book,
        singlebook: state.book.singlebook,
        isAuthenticated: state.auth.isAuthenticated
    })
}
export default connect(mapStateToProps, { getbooks, getbook, deletebook, logout })(Sidebar)