
import React, {useEffect, useState} from 'react' ; // useState for managing state, and useEffect for running side effects (like fetching data) when the component loads
import Layout from "./../../components/Layout" ; // Layout wrapper contains header, footer
import axios from "axios" ; 
import { Table } from 'antd'; // importing the Table component from the Ant Design, makes it easy to display data in a table format 

const Users = () => {

  const [users, setUsers] = useState([]) ;    // state to hold the list of users 

  /* GET users - sends a GET req to the backend to fetch all the users. 
  
  The 'Authorization' header is included to verify the user's identity with a token stored in 'localStorage' */

  const getUsers = async () => {
    try{
      const res = await axios.get('/api.v1/admin/getAllUsers',  {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      // If successful, update the users state with the fetched data

      if(res.data.success){
        setUsers(res.data.data) ; 
      }
    }catch(error){
      console.log(error) ; 
    }
  } ; 

  // Fetch users when the component mounts (i.e. when it first loads) - empty dependency array tells to run the function only once when component mounts

  useEffect(()=>{
    getUsers() ; 
  },[])


  // Ant Design (antd) Table column 

  const columns = [
    { 

      // This column is for displaying the user's name

      title: "Name",  // title of the column, displayed as the header 
      dataIndex: 'name',  // key in the data source to display in this column 
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    // This column checks if the user is a doctor and displays 'Yes' or 'No'

    {
      title: 'Doctor',
      dataIndex: 'isDoctor',

      // A custom rendering function to display 'Yes' or 'No'. If 'isDoctor' is true, display Yes otherwise No

      render: (text, record) => {
        <span>{
          record.isDoctor ? 'Yes' : 'No'
        }</span>
      }
    },

    // This column is for actions (like buttons) that can be performed on the user 

    {
      title: 'Actions',   // title of the column, displayed as the header 
      dataIndex: 'actions',

      // a custom rendering function to display action buttons 

      render: (text, record) => {
        <div className='d-flex'>
            <button className='btn btn-danger'>Block</button>
        </div>
      }
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-2'>Users List</h1>
        <Table 
        columns={columns} 
        
        /* The table automatically creates rows based on this data and fills each column with the corresponding vaoues from the 'users' array */
        
        dataSource={users} />
    </Layout>
  )
}

export default Users


/*
                SHOWING USER AND DOCTOR LISTS ON THE FRONTEND 


To show the user and doctor lists on the frontend, we'll need to fetch the data from the backend ('getAllUsersController' and 'getAllDoctorsController') and display it in the React components. 

1. Frontend sends a request to th Backend

  The React frontend will send an HTTP GET req to the backend endpoints ('/api/v1/admin/getAllUsers' and '/api/v1/admin/getAllDoctors') to fetch the user and doctor data. 

2. Backend Processes the Request 

  The backend receives the request, processes it by querying the database, and then sends the data back as a response in JSON format. 

3. Frontend Receives the Data

  The frontend receives the JSON response from the backend and updates the state to store the user and doctor data. 

4. Display data on the Frontend

  The frontend will then render this data using React components, typically in a table or list format. 

*/


/*
                                         Ant Design (antd) table column



  Columns Array: this array defines the structure of the table, specifying what columns will appear, and what data they will display. 

      Each object in the 'columns' array represents a column in the table. 

          - title: The header text for  the column 

          - dataIndex: the key in the data source (the 'users' array) that this column will display. 
                        'dataIndex' is used to specify which key in your data corresponds to the value that should be displayed in that particular column. 

                        Suppose, we have a object like this - 

                            {
                              name: "Sonu NM",
                              email: "sonu@gmail.com",
                              isDoctor: true
                            }

                        If we set 'dataIndex: 'name'' in our column, the table will show 'Sonu NM' in that column because it matches the 'name' key in our object 


          - render: A function that customizes how data is displayed in the column (for eg. it checks if a user is a doctor and displays "Yes" or "No"). Instead of directly showing the data from 'dataIndex', we can modify it or add custom elements (like buttons) using 'render'. If we don't user 'render', the table will simply display the value directly from 'dataIndex'

                      For example: In the 'Doctor' column, instead of just showing "true" or "false", it shows "yes"
                                    or "No" 

                      
                      {
                          title: 'Doctor',
                          dataIndex: 'isDoctor', // This would normally show true or false
                          render: (text, record) => (
                          <span>{record.isDoctor ? 'Yes' : 'No'}</span> // Show 'Yes' for true, 'No' for false
                              )
                      }


  Key Columns: 

    - Name: displays the user's name 
    - Email: displays the user's email
    - Doctor: checks if the user is a doctor (using 'record.isDoctor') and displays 'Yes' or 'No'
    - Actions: provides a button to perform actions like blocking the user
  
*/