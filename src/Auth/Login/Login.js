/* eslint-disable no-shadow */
import React, { useRef, useState } from 'react';
import './style.scss';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Form, Row, Col, Button, InputGroup,
} from 'react-bootstrap';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import ReCAPTCHA from 'react-google-recaptcha';
import { ApiPost } from '../../utils/api';
// import useToast from '../../../provider/Toast/useToast';
import { setUserLocalStorage } from '../../utils/cookie';
import { EndPoint } from '../../utils/EndPoint';
import { STORAGE_KEY } from '../../constant/storage';
import Storage from '../../utils/storage';
import axios from 'axios';

const Login = () => {
  const recaptcha = useRef();
  const passwordRef = useRef(null);

  // const toast = useToast();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [type, setType] = useState('Password');
  const [eyeIcon, setEyeIcon] = useState(<AiOutlineEyeInvisible />);
  const [rememberMe, setRememberMe] = useState(false);
  const validationSchema = yup.object().shape({
    User_Name: yup.string().required('Email is required'),
    Password: yup.string().required('Password is required'),
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = useFormik({
    initialValues: {
      User_Name: '',
      Password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Prevent default form submission
      if (typeof window !== 'undefined') {
        window.event.preventDefault();
      } else {
        return;
      }

      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) {
        addToast('Please verify the reCAPTCHA!', { appearance: 'error' });
        return; // Exit function if reCAPTCHA is not verified
      }

      try {
        // const res = await ApiPost(`${EndPoint.LOGIN_USER}`, values);
        const res = await axios.post(`http://193.194.195.101:8013/api/${EndPoint.LOGIN_USER}`, values);
        if (res?.status === 200) {
          addToast('Login Successfully', { appearance: 'success' });

          Storage.setStorageData(
            STORAGE_KEY.token,
            res.data.token,
            true,
          );
          Storage.setStorageJsonData(
            STORAGE_KEY.userId,
            res?.data?.user_Id,
            true,
          );
          const userData = {
            user_Id: res?.data?.user_Id,
            token: res?.data?.token,
          };
          setUserLocalStorage(userData);
          navigate('/admin/dashboard');
          // dispatch(Login_User(res?.data?.is_Admin));
          // dispatch(setLabSearchResults([]));
          // dispatch(clearState());
          // dispatch(clearStateResultData());

          // navigate(path.DASHBOARD);
          // ShowNotification(
          //   'Login Successfully',
          //   'success',
          // );
        }
      } catch (err) {
        console.log("errrr",err);
        if(err?.response?.status === 400){
          addToast(err?.response?.data?.message, { appearance: 'error' });
        }else{
          addToast(err.error, { appearance: 'error' });
        }
        // resetForm();
        // const usernameInput = document.getElementById('username-input');
        // if (usernameInput) {
        //   usernameInput.focus();
        // }
        // navigate('/');
      } finally {
        setSubmitting(false); // Set form submission status
      }
    },
  });

  // remember me
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);

    if (e.target.checked) {
      const loginTime = new Date().toISOString();
      localStorage.setItem('loginTime', loginTime); // Store login time in localStorage
    } else {
      localStorage.removeItem('loginTime'); // Remove login time from localStorage
    }
  };

  const passwordView = () => {
    if (type === 'Password') {
      setType('text');
      setEyeIcon(<AiOutlineEye />);
    } else {
      setType('Password');
      setEyeIcon(<AiOutlineEyeInvisible />);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handleConfirmPasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="login_page">
      <div className="login_page_form">
        {/* <img alt="logo" src="/asset/logo.png" /> */}
        <h2>Log in</h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                Username
                <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="User_Name"
                placeholder=""
                name="User_Name"
                value={values.User_Name}
                onChange={handleChange}
                isInvalid={!!errors.User_Name && touched.User_Name}
                onKeyPress={handleKeyPress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.User_Name}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                Password
                <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  ref={passwordRef}
                  type={type}
                  placeholder=""
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                  isInvalid={!!errors.Password && touched.Password}
                  onKeyPress={handleConfirmPasswordKeyPress}
                />

                <InputGroup.Text
                  onClick={passwordView}
                  className="icon-btn"
                >
                  {eyeIcon}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid" style={{ display: errors.Password ? 'block' : 'none' }}>
                {errors.Password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <ReCAPTCHA ref={recaptcha} sitekey="6Ld9brYpAAAAABe-B5GU_m3w8yRNbhLJl-Fw44xF" />
            </Form.Group>

          </Row>
          <Row className="mb-3 align-items-center">
            <Col xs={6}>
              <Form.Check
                type="checkbox"
                id="rememberMe"
                label="Remember me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              
            </Col>
            <Col xs={6} style={{textAlign: 'end'}}>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Col>
          </Row>

          <div className="d-grid mt-2">
            <Button
              type="submit"
              className="form_btn"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
