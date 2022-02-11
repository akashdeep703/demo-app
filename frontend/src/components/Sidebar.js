import React, { useState } from "react";
import './header.css';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { Table } from "react-bootstrap";
import { NavLink, useHistory } from 'react-router-dom';
const Sidebar = () => {
    const user = localStorage.getItem('user');
    const redirect = useHistory();
;
    const handlelogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        redirect.push("/");
    };
    return (
        <div >
            <div className='headerContainer'>
                <div style={{display: "flex",justifyContent: "space-between", paddingTop:"13px"}}> 
                
                <div style={{marginLeft: "50px"}}>
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
                    <CDBSidebar textColor="#fff" backgroundColor="#300a24">
                        <CDBSidebarContent className="sidebar-content">
                            <CDBSidebarMenu>
                                <NavLink exact to="" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="list-alt">Add Listing</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="user">User Info </CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="sign-out-alt" onClick={handlelogout}>Log Out</CDBSidebarMenuItem>
                                </NavLink>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    padding: '20px 5px',
                                }}
                            >
                            </div>
                        </CDBSidebarFooter>
                    </CDBSidebar>
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