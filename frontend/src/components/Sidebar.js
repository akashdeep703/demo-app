import React, { useState } from "react";
import './header.css';
import { Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import Addlisting from "./AddListing";
const Sidebar = () => {
    const [modalShow, setModalShow] = useState(false);
    const user = localStorage.getItem('user');
    const redirect = useHistory();
    const handleDashboard = () => {
        redirect.push("/dashboard");
    };
    const handleListing = () => {
        setModalShow(true);
    };
    const handleProfile = () => {
        redirect.push("/profile");
    };
    const handlelogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        redirect.push("/");
    };
    return (
        <div>
            <div className='headerContainer'>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "13px" }}>

                    <div style={{ marginLeft: "50px" }}>
                        <h6>Welcome {user}</h6>
                    </div>
                    <div>
                        <input
                            type="text"
                            // onKeyDown={(e) => searchImages(e)}
                            placeholder="Search For Listing"
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
                        <i class="bi bi-card-heading"></i> &nbsp; Dashboard
                            </button>
                            <button className="ButtonStyle" onClick={() => handleListing()}>
                                <i className="bi bi-list"></i> &nbsp; Add Listing
                            </button>
                            <button className="ButtonStyle" onClick={() => handleProfile()}>
                                <i className="bi bi-person-fill"></i> &nbsp; User Info
                            </button>
                            <button className="ButtonStyle" onClick={handlelogout}>
                                <i className="bi bi-box-arrow-in-right"></i> &nbsp; Log Out
                            </button>
                            <Addlisting show={modalShow}
                            />
                        </div>
                    </div>
                </div>
                <div className='tableContent'>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            </div>

        </div>
    );
};
export default Sidebar;