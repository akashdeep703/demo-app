import React from 'react';
import { Navbar } from 'react-bootstrap';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', backgroundColor: '#e9eaec' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#300a24">
                <CDBSidebarHeader prefix={<i></i>}>
                    <a  style={{ color: 'inherit' }}>
                        Demo App
                    </a>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/tables" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="list-alt">Add Listing</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="sign-out-alt">Log Out</CDBSidebarMenuItem>
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

            <div>
                <Navbar style={{ display: 'flex', justifyContent: 'space-around', width: '1650px', height: '77px', backgroundColor: '#e7f1ff' }}>
                    <Navbar.Brand href="#home">Welcome
                    </Navbar.Brand>
                    <Navbar.Text style={{ color: '#333' }}>
                        Mark Otto
                    </Navbar.Text>
                </Navbar>
            </div>
        </div>
    );
};
export default Sidebar;