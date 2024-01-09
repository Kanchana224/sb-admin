import React, { useState, useEffect } from 'react';
import Card from './Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/ApiService';

function Dashboard() {
  const data = [
    {
      title: 'EARNINGS (MONTHLY)',
      value: '$45,000',
      color: 'primary',
      icon: 'fa-calendar',
      isProgress: false,
    },
    {
      title: 'EARNINGS (ANNUAL)',
      value: '$215,000',
      color: 'success',
      icon: 'fa-dollar-sign',
      isProgress: false,
    },
    {
      title: 'TASKS',
      value: '50%',
      color: 'info',
      icon: 'fa-clipboard-list',
      isProgress: true,
    },
    {
      title: 'PENDING REQUEST',
      value: '18',
      color: 'warning',
      icon: 'fa-comments',
      isProgress: false,
    },
  ];

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let res = await AxiosService.delete(`/Formik-validation/${id}`);
      if (res.status === 200) {
        console.log('User deleted successfully');
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getData = async () => {
    try {
      let res = await AxiosService.get('/Formik-validation');
      if (res.status === 200) {
        console.log('Data fetched successfully:', res.data);
        setUsers(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className="row">
              {data.map((e, i) => {
                return <Card cardData={e} key={i} />;
              })}
            </div>
            <div className="row">
            <h2 style={{fontFamily:"cursive",fontWeight:"bolder",color:"black",margin:"20px"}}>Books Details</h2>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>S.No</th>
      <th>Title</th>
      <th>Author</th>
      <th>ISBN Number</th>
      <th>Publication Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user,i) => (
      <tr key={user.id}>
        <td>{i+1}</td>
        <td>{user.Books.Title}</td>
        <td>{user.Books.Author}</td>
        <td>{user.Books.ISBN_Number}</td>
        <td>{user.Books.Publication_Date}</td>
        <td>
          <Button className="btn btn-primary" onClick={() => navigate(`/edit-user/${user.id}`)}>
          <i class="fa-solid fa-pen-to-square"></i>
          </Button>{' '}
          <Button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
          <i class="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
<h2 style={{ fontFamily: "cursive", fontWeight: "bolder", color: "black", margin: "20px", whiteSpace: "nowrap" }}>Author's Details</h2>
<Table striped bordered hover>
  <thead>
    <tr>
      <th style={{width:"50px"}}>S.No</th>
      <th>Authors Name</th>
      <th>BirthDate</th>
      <th>Biography</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user,i) => (
      <tr key={user.id}>
        <td>{i+1}</td>
        <td>{user.Author.Authors_Name}</td>
        <td>{user.Author.Birth_Date}</td>
        <td>{user.Author.Biography}</td>
        <td>
          <Button variant="primary" onClick={() => navigate(`/edit-user/${user.id}`)}>
          <i class="fa-solid fa-pen-to-square"></i>
          </Button>{' '}
          <Button variant="danger" onClick={() => handleDelete(user.id)}>
          <i class="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
