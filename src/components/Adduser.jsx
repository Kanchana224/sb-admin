import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

function Adduser() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Books: {
        Title: '',
        Author: '',
        ISBN_Number: '',
        Publication_Date: '',
      },
      Author: {
        Authors_Name: '',
        Birth_Date: '',
        Biography: '',
      }
    },
    validationSchema: Yup.object({
      Books: Yup.object({
        Title: Yup.string().required('Title is Required').min(4, 'Title can not be shorter than 4 letters'),
        Author: Yup.string().required('Author Name is Required'),
        ISBN_Number: Yup.string().required('ISBN Number is required').matches(/^\d{6}$/, 'Enter a valid ISBN Number'),
        Publication_Date: Yup.string().required('Date is Required'),
      }),
      Author: Yup.object({
        Authors_Name: Yup.string().required("Authors name is required"),
        Birth_Date: Yup.string().required('BirthDate is Required'),
        Biography: Yup.string().required('Biography is required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post('/Formik-validation', values);
        if (res.status === 201) {
          navigate('/dashboard');
        }
      } catch (error) {
        // console.error(error);
      }
    }
    
  });

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
    
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
            <Form.Label style={{ color: "black", fontFamily: "cursive", fontSize: "22px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent:"center" }}>Books 📚📕</Form.Label>

              <Form.Control style={{textAlign:"center"}}
                type="text"
                placeholder="Title"
                id="Title"
                name="Books.Title"
                onChange={formik.handleChange}
                value={formik.values.Books.Title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Books?.Title && formik.errors.Books?.Title  ? (
                <div style={{ color: "red" }}>{formik.errors.Books.Title}</div>
              ) : null}
<br/>
              <Form.Control
                type="text"
                placeholder="Author"
                id="Author"
                name="Books.Author"
                onChange={formik.handleChange}
                value={formik.values.Books.Author}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Books?.Author && formik.errors.Books?.Author ? (
                <div style={{ color: "red" }}>{formik.errors.Books.Author}</div>
              ) : null}
<br/>
              <Form.Control
                type="text"
                placeholder="ISBN Number"
                id="ISBN_Number"
                name="Books.ISBN_Number"
                onChange={formik.handleChange}
                value={formik.values.Books.ISBN_Number}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Books?.ISBN_Number && formik.errors.Books?.ISBN_Number ? (
                <div style={{ color: "red" }}>{formik.errors.Books.ISBN_Number}</div>
              ) : null}<br/>

              <Form.Control
                type="text"
                placeholder="Publication_Date"
                id="Publication_Date"
                name="Books.Publication_Date" 
                onChange={formik.handleChange}
                value={formik.values.Books.Publication_Date}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Books?.Publication_Date && formik.errors.Books?.Publication_Date ? (
                <div style={{ color: "red" }}>{formik.errors.Books.Publication_Date}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "black", fontFamily: "cursive", fontSize: "22px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent:"center" }}>📗Author's Details 👴👵</Form.Label>
              <Form.Control
                type="text"
                placeholder="Authors_Name"
                id="Authors_Name"
                name="Author.Authors_Name" 
                onChange={formik.handleChange}
                value={formik.values.Author.Authors_Name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Author?.Authors_Name && formik.errors.Author?.Authors_Name ? (
                <div style={{ color: "red" }}>{formik.errors.Author.Authors_Name}</div>
              ) : null}<br/>

              <Form.Control
                type="text"
                placeholder="Birth_Date"
                id="Birth_Date"
                name="Author.Birth_Date" 
                onChange={formik.handleChange}
                value={formik.values.Author.Birth_Date}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Author?.Birth_Date && formik.errors.Author?.Birth_Date ? (
                <div style={{ color: "red" }}>{formik.errors.Author.Birth_Date}</div>
              ) : null}<br/>

              <Form.Control
                type="text"
                placeholder="Biography"
                id="Biography"
                name="Author.Biography" 
                onChange={formik.handleChange}
                value={formik.values.Author.Biography}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Author?.Biography && formik.errors.Author?.Biography ? (
                <div style={{ color: "red" }}>{formik.errors.Author.Biography}</div>
              ) : null}
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
  <Button  variant="primary" type="submit">
    Submit
  </Button>
</div>

          </Form>
        </div>
      </div>
    </div>
  );
}

export default Adduser;
