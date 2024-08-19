import React, { Children } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {message, Badge} from 'antd' ; 


const navigate = useNavigate() ; 

// Logout function 

const handleLogout=()=>{
  localStorage.clear() ; 
  message.success('Logout Successfully') ; 
  navigate("/login") ; 
}


const Layout = ({ children }) => {

  const {user} = useSelector(state => state.user) ; 
  const location = useLocation();

  // Rendering menu list 

  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu ; 

  return (
    <>
      <div className="main">
        <div className="layout">
          {/* The 'layout' div contains two main sections: 'sidebar' and the 'content' */}

          <div className="sidebar">
            {/* The 'sidebar' contains two child divs: 'logo' where we place our application's logo and 'menu' where we place our navigation menu items or links */}

            <div className="logo">
              <h6>HealthHorizon</h6>
              <hr />
            </div>

            <div className="menu">
              {/* Dynamically generate and display a sidebar menu using the 'SidebarMenu' array. The 'SidebarMenu' is an array of objects where each object represents a menu item (Home, Appointments, Profile). 
                    The .map() function iterates over each object/item ('menu') in the 'SidebarMenu' array. 
                    Each menu item is wrapped in a 'div' with the class 'menu-item'. This 'div' represents a single clickable item in the sidebar. We can style this 'div' with CSS to control the appearance of each item in the menu. 
                     */}

              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path; /* checking the active path. 

                'location.pathname' gives the current URL path 

                'menu.path' is the path defined in each menu item object

                isActive is a boolean variable that checks if the current URL matches the 'path' of the menu item. If they match, 'isActive' will be 'true', otherwise 'false'

                */

                return (
                  <>

                    {/* Conditional styling. Will add the 'active' class only if 'isActive' is 'true'
                    
                    If 'isActive' is 'true', add 'active' to the class list. If 'false' don't add anything.     

                     */}

                    <div className={`menu-item ${isActive && "active"} `}>

                      <i className={menu.icon}></i>
                    
                      <Link to={menu.path}>{menu.name}</Link>

                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout} >

                      <i className="fa-solid fa-right-from-bracket"></i>
                    
                      <Link to='/login'>Logout</Link>

                    </div>
            </div>
          </div>

          {/* The 'content' div contains two child divs: 'header' where we place a navigation bar, breadcrumbs or other contextual information related to the page currently being viewed and 'body' where the main content of the page would be displayed. This is where we render different components based on the route */}

          <div className="content">
            <div className="header">
              <div className="header-content"
              style={{cursor:"pointer"}}
              >
                <Badge count={user && user.notification.length} onClick={()=>{
                  navigate('/notification')
                }}
                 >
                <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to='/profile'>{user.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

/*
Creating a layout component in React application helps structure our App by providing a consistent layout across different pages.

This typically includes elements like the navigation bar, sidebar, footer, and a main content area where the actual page content is rendered. 

Using a layout component helps maintain consistent look and feel across different pages of our application. It also reduces repitition, as we don't have to include common elements like the navbar and footer in every single page component. This makes code cleaner, more modular, and easier to maintain. 

1. Navbar - this component typically includes the site's navigation links, logo, and maybe a search bar or user profile links  

*/

/*
                        useLocation Hook


The 'useLocation' hook in React router is used to access the current location object, which represents the current URL. This is particularly useful when we want to apply specific styles or perform certain actions based on the current route or URL path. 

- highlight the currently active menu item in the sidebar. 

- when a user clicks on a menu item and navigates to a different route, the 'useLocation' hook will help determine which route is active, and then the corresponding menu item can be styled differently to indicate that it is the current selection. 

*/
