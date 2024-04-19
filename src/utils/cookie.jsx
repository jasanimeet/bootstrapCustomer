import Cookies from 'js-cookie';

export const setUserCookie = (user) => {
  localStorage.setItem('Token', user?.token);
  Cookies.set('AdminToken', JSON.stringify(user), { expires: 1, sameSite: 'strict', secure: false });
};

// save on local storage
export const setUserLocalStorage = (user) => {
  localStorage.setItem('user_id', JSON.stringify(user?.user_Id));
  localStorage.setItem('token', user?.token);
};

export const getUser = async () => {
  const user = await Cookies.get('AdminToken');
  if (user) {
    const userData = JSON.parse(user);
    return userData;
  }
  return null;
};

export const getUserToken = async () => {
  const user = await Cookies.get('AdminToken');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

export const getUserName = async () => {
  const user = await Cookies.get('AdminToken');
  if (user) {
    const userData = JSON.parse(user);
    return userData.name;
  }
  return null;
};

export const removeUserData = async () => {
  localStorage.removeItem('Token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('token');
  await Cookies.remove('AdminToken');
};
