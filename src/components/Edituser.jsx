import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../utils/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Edituser() {
  let params = useParams();
  let [initialValues, setValues] = useState({
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
    },
  });

  let navigate = useNavigate();

  const getUserData = async () => {
    let { id } = params;
    try {
      let res = await AxiosService.get(`/Formik-validation/${id}`);
      if (res.status === 200) {
        setValues({
          Books: {
            Title: res.data.Books.Title,
            Author: res.data.Books.Author,
            ISBN_Number: res.data.Books.ISBN_Number,
            Publication_Date: res.data.Books.Publication_Date,
          },
          Author: {
            Authors_Name: res.data.Author.Authors_Name,
            Birth_Date: res.data.Author.Birth_Date,
            Biography: res.data.Author.Biography,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      Books: Yup.object({
        Title: Yup.string().required('Title is Required').min(4, 'Title can not be shorter than 4 letters'),
        Author: Yup.string().required('Author Name is Required'),
        ISBN_Number: Yup.string().required('ISBN Number is required').matches(/^\d{6}$/, 'Enter a valid ISBN Number'),
        Publication_Date: Yup.string().required('Date is Required'),
      }),
      Author: Yup.object({
        Authors_Name: Yup.string().required("Author's name is required"),
        Birth_Date: Yup.string().required('BirthDate is Required'),
        Biography: Yup.string().required('Biography is required')
      }),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res = await AxiosService.put(`/Formik-validation/${id}`, values);
        if (res.status === 200) navigate('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Books</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                id="Title"
                name="Books.Title"
                onChange={formik.handleChange}
                value={formik.values.Books.Title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Books?.Title && formik.errors.Books?.Title ? (
                <div style={{ color: "red" }}>{formik.errors.Books.Title}</div>
              ) : null}

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
              ) : null}

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
              <Form.Label>Author</Form.Label>
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
              ) : null}

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
              ) : null}

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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Edituser;
