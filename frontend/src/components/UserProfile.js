

import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { baseURL } from '../config';
const UserProfile = () => (
  <div>
    {/* <h1>Anywhere in your app!</h1> */}
    <Formik
      initialValues={{ 
            first_name: '',
            last_name: '',
            country: '',
            city: '',
            email: '',
            password:'',
            phone_number: '',
            profile_img: null,

       }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios.post(`${baseURL}v1/users/register`, values)
        .then(response => {
            alert('Successfully registred')  // Log the response from the server
            setSubmitting(false);       // Stop the submitting state
        })
        .catch(error => {
            if(error?.response?.data?.msg){
                alert(error?.response?.data?.msg)
                console.log(error)
            }else{
                alert('Something Wrong!')
            }
            
            console.error(error);       // Log any errors
            setSubmitting(false);       // Stop the submitting state
        });
        // setTimeout(() => {
            
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='First Name'
            value={values.first_name}
          />
          {errors.first_name && touched.first_name && errors.first_name}
          <input
            type="text"
            placeholder='Last Name'
            name="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
          />
          {errors.last_name && touched.last_name && errors.last_name}
          <input
            type="number"
            placeholder='phone number'
            name="phone_number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone_number}
          />
           {errors.phone_number && touched.phone_number && errors.phone_number}
          <input
            type="text"
            placeholder='Country'
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
          />
          {errors.country && touched.country && errors.country}
          <input
            type="text"
            placeholder='City'
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          {errors.city && touched.city && errors.city}
          <input
            type="email"
            placeholder='Email'
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            placeholder='Password'
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default UserProfile;