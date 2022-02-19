import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Addlisting from "./AddBooks";
import usericon from '../images/user.png';
import logo from '../images/logo.png'
const Profile = () => {
    const [modalShow, setModalShow] = useState(false);
    const user = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const usertype = localStorage.getItem('usertype');

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
        localStorage.removeItem('email');
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
                </div>
            </div>
            <div className='mainContainer'>
                <div className='sideBar'>
                    <div className="sideBarPanel">
                        <div className="ButtonPanel">
                            <button className="ButtonStyle-1" onClick={() => handleDashboard()}>
                                <i className="bi bi-card-heading"></i> &nbsp; Dashboard
                            </button>
                            <button className="ButtonStyle" onClick={() => handleListing()}>
                                <i className="bi bi-journal-code"></i> &nbsp; Add Books
                            </button>
                            <button className="ButtonStyle" onClick={() => handleProfile()}>
                                <i className="bi bi-person-fill"></i> &nbsp; User Info
                            </button>
                            <button className="ButtonStyle" onClick={handlelogout}>
                                <i className="bi bi-box-arrow-in-right"></i> &nbsp; Log Out
                            </button>
                            <Addlisting show={modalShow}
                                onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </div>
                <div className='profileMain'>
                    <div className="profileContent">
                        <div className="UserInfo">
                            User Details
                        </div>
                        <div className="UserInfoContent">
                            <img src={usericon} height="120px" /><br /><br />
                            <h4>
                                {user}
                            </h4>
                            <h4>
                                {email}
                            </h4>
                            <h4>
                                {phone}
                            </h4>
                            <h4>
                                {usertype == '1' ? 'Basic' : 'Premium'}
                            </h4>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};
export default Profile;
