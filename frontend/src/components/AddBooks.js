import { React, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { addbook, getbook, getbooks, updatebook } from "../actions/bookActions";
export function AddBooks(props) {
    const id = props.singlebook;
    const [bookname, setBookName] = useState('');
    const [authorname, setAuthorName] = useState('');
    const [quantity, setQuanitity] = useState('');
    const [price, setPrice] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorbookname, setErrorBookName] = useState(false);
    const [errorauthorname, setErrorAuthorName] = useState(false);
    const [errorquantity, setErrorQuantity] = useState(false);
    const [errorprice, setErrorPrice] = useState(false);
    const redirect = useHistory();
    useEffect(() => {
        if (props.singlebook.books && !bookname) {
            setBookName(props.singlebook.books.bookname);
        }
        if (props.singlebook.books && !authorname) {
            setAuthorName(props.singlebook.books.authorname);
        }
        if (props.singlebook.books && !quantity) {
            setQuanitity(props.singlebook.books.quantity);
        }
        if (props.singlebook.books && !price) {
            setPrice(props.singlebook.books.price);
        }
    });

    const handleBookName = (e) => {
        let item = e.target.value;
        if (item.length < 3 || item.length > 40) {
            setErrorBookName(true);
        } else {
            setErrorBookName(false);
        }
        setBookName(item);
        setSubmitted(false);
    };
    const handleDashboard = () => {
        redirect.push("/dashboard");
    };
    const handleAuthorName = (e) => {
        let item = e.target.value;
        if (item.length < 3 || item.length > 25) {
            setErrorAuthorName(true);
        } else {
            setErrorAuthorName(false);
        }
        setAuthorName(item);
        setSubmitted(false);
    };
    const handleQuantity = (e) => {
        let item = e.target.value;
        if (item === '0' || item.length === 0 || item.length > 8) {
            setErrorQuantity(true);
        } else {
            setErrorQuantity(false);
        }
        setQuanitity(item);
        setSubmitted(false);
    };
    const handlePrice = (e) => {
        let item = e.target.value;
        if (item === '0' || item.length === 0 || item.length > 8) {
            setErrorPrice(true);
        } else {
            setErrorPrice(false);
        }
        setPrice(item);
        setSubmitted(false);
    };
    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bookname.length < 3 && authorname.length < 3 && quantity.length === 0 && price.length === 0) {
            setErrorAuthorName(true);
            setErrorBookName(true);
            setErrorPrice(true);
            setErrorQuantity(true);
            setSubmitted(false);
        } else if (bookname.length < 3) {
            setErrorBookName(true);
            setSubmitted(false);
        } else if (authorname.length < 3) {
            setErrorAuthorName(true);
            setSubmitted(false);
        } else if (quantity.length === 0) {
            setErrorQuantity(true);
            setSubmitted(false);
        } else if (price.length === 0) {
            setErrorPrice(true);
            setSubmitted(false);
        } else {
            setErrorBookName(false);
            setErrorAuthorName(false);
            setErrorQuantity(false);
            setErrorPrice(false);
            if (props.singlebook.books) {
                // Request body 
                const body = { bookname: bookname, authorname: authorname, quantity: quantity, price: price };
                // update items
                await props.updatebook(id.books._id, body);
                props.onHide(false);
                props.getbooks();
            } else {
                // Request body 
                const body = { bookname: bookname, authorname: authorname, quantity: quantity, price: price };
                // add items
                props.addbook(body);
                props.onHide(false);
                handleDashboard();
            }

        }
    };
    return (
        <Modal
            show={props.show} onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="modalHead">
                <Modal.Title className="modalTitle">Add Books Details</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form method='Post'>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Book Name*</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter Book Name" value={bookname} onChange={(e) => handleBookName(e)} />
                    {errorbookname ? <Form.Text align="left" className="text-danger">Please enter book name </Form.Text> : ""}
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Author Name*</Form.Label>
                    </div>
                    <Form.Control type="text" placeholder="Enter Author Name" value={authorname} onChange={handleAuthorName} />
                    {errorauthorname ? <Form.Text align="left" className="text-danger">Please enter author name </Form.Text> : ""}
                </Form.Group>
                <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Quantity*</Form.Label>
                    </div>
                    <Form.Control type="number" placeholder="Add Quantity" value={quantity} onChange={handleQuantity} />
                    {errorquantity ? <Form.Text align="left" className="text-danger">Please enter valid quantity </Form.Text> : ""}
                </Form.Group> <Form.Group className="mb-3">
                    <div align="left">
                        <Form.Label>Price (&#8377;)*</Form.Label>
                    </div>
                    <Form.Control type="number" placeholder="Enter Book Price" value={price} onChange={handlePrice} />
                    {errorprice ? <Form.Text align="left" className="text-danger">Please enter valid price </Form.Text> : ""}
                </Form.Group>
            </Form><br />
                <div className="modalButton">
                    <Button className='button' variant="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
const mapStateToProps = (state) => ({
    book: state.book,
    singlebook: state.book.singlebook
})
export default connect(mapStateToProps, { addbook, getbook, getbooks, updatebook })(AddBooks);