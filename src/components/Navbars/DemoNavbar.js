/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AutoComplete from "common/FormControls/AutoComplete/AutoComplete";
import InputMaster from "common/FormControls/input/InputMaster";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";
import { EndPoint } from "utils/EndPoint";
import { options } from "utils/GroupName";
import { passwordPattern } from "utils/Regex";
// import { options } from "utils/GroupName";
import { emailPattern } from "utils/Regex";
import { ApiGet } from "utils/api";
import { ApiPost } from "utils/api";
import { ApiPut } from "utils/api";
import { removeUserData } from "utils/cookie";

function Header(props) {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();

  const [UserProfileOpen, setUserProfileOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    company_Name: '',
    user_Name: '',
    email: '',
    email_1: '',
    mobile_No_Country_Code: '',
    mobile_No: '',
    phone_No_Country_Code: '',
    phone_No: '',
  });
  const [emailError, setEmailError] = useState({});
//chnage password
const [showPassword, setShowPassword] = useState(false);
const [changePasswordOpen, setChangePasswordOpen] = useState(false);
const [changePassword, setChangePassword] = useState({ OldPassword: '', NewPassword: '', ConfirmPassword: '' });
const [changePasswordError, setChangePasswordError] = useState({});

  const location = useLocation();

  const emailRef = useRef();
  const email1Ref = useRef();
  const mobileRef = useRef();
  const phoneRef = useRef();

  const handleFormEnterKey = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserProfileData({ ...userProfileData, email });
    setEmailError((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handleEmailChange1 = (e) => {
    setUserProfileData({ ...userProfileData, email_1: e.target.value });
  };

  const handleMobileChange = (e) => {
    setUserProfileData({ ...userProfileData, mobile_No: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setUserProfileData({ ...userProfileData, phone_No: e.target.value });
  };

   // User Profile
   useEffect(() => {
    ApiGet(`${EndPoint?.GET_USER_PROFILE}`)
      .then((res) => {
        setUserProfileData({
          company_Name: res?.data?.data?.company_Name,
          user_Name: res?.data?.data?.user_Name,
          email: res?.data?.data?.email,
          email_1: res?.data?.data?.email_1,
          mobile_No_Country_Code: {
            label: res?.data?.data?.mobile_No_Country_Code || '',
            value: res?.data?.data?.mobile_No_Country_Code || '',
          },
          mobile_No: res?.data?.data?.mobile_No,
          phone_No_Country_Code: {
            label: res?.data?.data?.phone_No_Country_Code || '',
            value: res?.data?.data?.phone_No_Country_Code || '',
          },
          phone_No: res?.data?.data?.phone_No,
        });
      });
  }, []);

  const updateProfile = () => {
    if (!userProfileData?.email) {
      setEmailError((prevErrors) => ({ ...prevErrors, email: 'Required' }));
      return;
    }

    if (!emailPattern.test(userProfileData?.email)) {
      setEmailError((prevErrors) => ({ ...prevErrors, email: 'Write Proper Email' }));
      return;
    }

    const body = {
      email: userProfileData?.email,
      email_1: userProfileData?.email_1,
      mobile_No: userProfileData?.mobile_No,
      phone_No: userProfileData?.phone_No,
    };
    ApiPut(`${EndPoint?.UPDATE_USER_PROFILE}`, body)
      .then((res) => {
        setUserProfileOpen(false);
        addToast(res?.data?.message, { appearance: 'success' });
        setEmailError({});
      });
  };

  // Change Password
  const handleChange = (fieldName, value) => {
    setChangePassword({ ...changePassword, [fieldName]: value });
    // if (fieldName === 'NewPassword') {
    //   setPasswordMatch(value === changePassword.ConfirmPassword);
    // } else

    if (fieldName === 'OldPassword') {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, oldPass: '' }));
    }
    if (fieldName === 'NewPassword') {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, newPass: '' }));
    }
    if (fieldName === 'ConfirmPassword') {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, confirmPass: '' }));
    }
  };

  const changePassBtn = () => {
    if (!changePassword?.OldPassword) {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, oldPass: 'Required' }));
      return;
    } if (!changePassword?.NewPassword) {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, newPass: 'Required' }));
      return;
    } if (!passwordPattern.test(changePassword?.NewPassword)) {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, newPass: 'Please Strong password' }));
      return;
    }
    if (!changePassword?.NewPassword) {
      setChangePasswordError((prevErrors) => ({ ...prevErrors, newPass: 'Required' }));
      return;
    }
    // return;
    const body = {
      OldPassword: changePassword?.OldPassword,
      NewPassword: changePassword?.NewPassword,
      ConfirmPassword: changePassword?.ConfirmPassword,
    };

    ApiPost(`${EndPoint?.CHANGE_PASSWORD}`, body)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setChangePasswordOpen(false);
          addToast(res?.data?.message, { appearance: 'success' });
          setChangePassword({});
        }
      }).catch((error) => {
        if (error?.error === 'Password not match with old password.') {
          addToast(error?.error, { appearance: 'error' });
          setChangePasswordError({ oldPass: error?.error });
        } else if (error?.error === 'New password not match with confirm password.') {
          setChangePasswordError({ confirmPass: error?.error });
        } else {
          console.log('');
        }
      });
  };
  const handleLogout = () =>{
    removeUserData();
    navigate('/');
  }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <>
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            {/* <NavItem>
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem> */}
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" onClick={() => setUserProfileOpen(true)}>My Profile</DropdownItem>
        
                <DropdownItem tag="a" onClick={() => setChangePasswordOpen(true)}>Change Password</DropdownItem>
                <DropdownItem tag="a" onClick={handleLogout}>LogOut</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <NavItem>
              <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>

    {/* User Profile */}
    {UserProfileOpen
      && (
      <Dialog
        open={UserProfileOpen}
        // className={classes.customDialog}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: '30%',
            maxWidth: '450px',
            maxHeight: 500,
            border: '1px solid #c6c6c6',
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle
          style={{ padding: '5px', color: '#3c6070', textAlign: 'center' }}
        >
          User Profile
        </DialogTitle>
        <DialogContent>
          <InputMaster
            label="Company Name"
            value={userProfileData?.company_Name}
            disabled
          />
          <InputMaster
            label="User Name"
            value={userProfileData?.user_Name}
            disabled
          />
          <InputMaster
            required
            autoFocus
            label="Email1"
            value={userProfileData?.email}
            onChange={handleEmailChange}
            inputRef={emailRef}
            onKeyDown={(e) => handleFormEnterKey(e, email1Ref)}
            helperTexts={emailError?.email}
            errors={!!emailError?.email}
          />
          <InputMaster
            label="Email2"
            value={userProfileData?.email_1}
            onChange={handleEmailChange1}
            inputRef={email1Ref}
            onKeyDown={(e) => handleFormEnterKey(e, mobileRef)}
          />
          <div style={{ display: 'flex' }}>
            <div style={{ width: '25%' }}>
              <AutoComplete
                disabled
                name="Code"
                options={options}
                style={{ height: '15px!important' }}
                value={userProfileData?.mobile_No_Country_Code}
              />
            </div>
            <div style={{ width: '75%' }}>
              <InputMaster
                size="small"
                label="Mobile1"
                value={userProfileData?.mobile_No}
                onChange={handleMobileChange}
                maxLength={13}
                inputRef={mobileRef}
                onKeyDown={(e) => handleFormEnterKey(e, phoneRef)}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '25%' }}>
              <AutoComplete
                disabled
                name="Code"
                options={options}
                style={{ height: '15px' }}
                value={userProfileData?.phone_No_Country_Code}
              />
            </div>
            <div style={{ width: '75%' }}>
              <InputMaster
                label="Phone1"
                type="number"
                value={userProfileData?.phone_No}
                onChange={handlePhoneChange}
                maxLength={10}
                inputRef={phoneRef}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            onClick={() => {
              setUserProfileOpen(false);
              setEmailError({});
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            onClick={updateProfile}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    )}

       {/* Change Password  */}
      {changePasswordOpen
      && (
      <Dialog
        open={changePasswordOpen}
        // className={classes.customDialog}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: '30%',
            maxWidth: '450px',
            maxHeight: 500,
            border: '1px solid #c6c6c6',
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle
          style={{ padding: '5px', color: '#3c6070', textAlign: 'center' }}
        >
          Change Password
        </DialogTitle>
        <DialogContent>
          <InputMaster
            autoFocus
            required
            label="Existing Password"
            type={showPassword ? 'text' : 'password'}
            name="OldPassword"
            value={changePassword?.OldPassword}
            onChange={(e) => handleChange('OldPassword', e.target.value)}
            helperTexts={changePasswordError?.oldPass}
            errors={!!changePasswordError?.oldPass}
          />
          <InputMaster
            required
            label="New Password"
            type="password"
            name="NewPassword"
            value={changePassword?.NewPassword}
            onChange={(e) => handleChange('NewPassword', e.target.value)}
            helperTexts={changePasswordError?.newPass}
            errors={!!changePasswordError?.newPass}
          />
          <InputMaster
            required
            label="Retype New Password"
            type="password"
            name="ConfirmPassword"
            value={changePassword?.ConfirmPassword}
            onChange={(e) => handleChange('ConfirmPassword', e.target.value)}
            helperTexts={changePasswordError?.confirmPass}
            errors={!!changePasswordError?.confirmPass}
          />

        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            onClick={() => {
              setChangePasswordOpen(false);
              setChangePassword(null);
              setChangePasswordError({});
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            onClick={changePassBtn}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      )}
      </>
  );
}

export default Header;
