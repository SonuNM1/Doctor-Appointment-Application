

/*
'useMenu' and 'adminMenu', each contains a list of menu items for different types of users (regular users and admins). These arrays are used to dynamically generate a sidebar menu in the application. 
*/


/*
'userMenu' contains the menu items that a regular user would see in the sidebar. Each object in the array represents a menu item with three properties. 
 */


export const userMenu = [
    {
        name: "Home",
        path: '/',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: 'fa-solid fa-list'
    },
    {
        name: 'Apply Doctor',
        path: '/apply-doctor',
        icon: 'fa-solid fa-user-doctor'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-user'
    }
]


// Admin menu 


/*
This array contains the menu items that an admin user can see 
*/

export const adminMenu = [
    {
        name: "Home",
        path: '/',
        icon: 'fa-solid fa-house'
    },
   
    {
        name: 'Doctors',
        path: '/doctors',
        icon: 'fa-solid fa-user-doctor'
    },
    {
        name: 'Users',
        path: '/users',
        icon: 'fa-solid fa-user'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-user'
    },
   
]


/*

The goal is to dynamically generate a sidebar menu based on this data. 

By mapping over the 'SidebarMenu' array, we can create a list of sidebar items that are automatically populated from this array. 

This approach allows easy updates and maintenance of the menu items. 

Use the .map() method to iterate over the 'SidebarMenu' array and generate JSX elements for each menu item. 

*/