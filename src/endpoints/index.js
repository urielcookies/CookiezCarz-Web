/* eslint-disable max-len */
/* eslint-disable no-tabs */
import { get, post, put } from 'axios';
import { reverse } from 'lodash';

const URL = 'https://carlistapi.azurewebsites.net';

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Sample usage
// This is not reliable
// const headers = {'Content-Type': 'application/json', token: getCookie('token')};

export const writeCookie = (key, value, days) => {
  const date = new Date();

  // Default at 365 days.
  days = days || 365;

  // Get unix milliseconds at current time plus number of days
  date.setTime(+date + (days * 86400000)); // 24 * 60 * 60 * 1000

  window.document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=/`;

  return value;
};

export const loginUserOld = (userInfo, push, setErrorMessage, setSubmitLoading) => {
  const data = JSON.stringify(userInfo);
  setSubmitLoading(true);
  post(`${URL}/api/useraccounts/login`, data, { headers: { 'Content-Type': 'application/json' } })
    .then(({ data, status }) => {
      setSubmitLoading(false);
      if (status === 200 && data) {
        writeCookie('token', data);
        push('/home');
      } else setErrorMessage('Wrong email or password');
    })
    .catch((error) => {
      console.log('error', error);
      setSubmitLoading(false);
      setErrorMessage('Wrong email or password');
    });
};

export const loginUser = (data) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return post(`${URL}/api/useraccounts/login`, data, { headers })
    .catch((error) => {
      console.log('error', error);
    });
};

export const fetchActiveUser = () => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/useraccounts/getuserinfo`, { headers })
    .catch((error) => console.log(error));
};

export const fetchActiveAccount = ({ isActiveLoading, setIsActiveAccountLoading, setActiveAccount }) => {
  if (isActiveLoading) {
    const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
    get(`${URL}/api/useraccounts/getuserinfo`, { headers })
      .then(({ data }) => {
        setIsActiveAccountLoading(false);
        setActiveAccount(data);
      })
      .catch((error) => console.log(error));
  }
};

// export const fetchCarExpenses = ({
//   isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses, carInfoId,
// }) => {
//   if (isCarExpensesLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carexpenses/${carInfoId}`, { headers })
//       .then(({ data }) => {
//         setIsCarExpensesLoading(false);
//         setCarExpenses(reverse(data));
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchCarExpenses = (carInfoId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carexpenses/${carInfoId}`, { headers })
    .catch((error) => console.log(error));
};

// export const fetchUsers = ({ isUsersLoading, setIsUsersLoading, setUsers }) => {
//   if (isUsersLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/caraccess/getusernames`, { headers })
//       .then(({ data }) => {
//         setIsUsersLoading(false);
//         setUsers(data);
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchUsers = () => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/caraccess/getusernames`, { headers })
    .catch((error) => console.log(error));
};

// export const fetchCars = ({ isLoading, setIsLoading, setCarList }) => {
//   if (isLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carinformation`, { headers })
//       .then(({ data }) => {
//         setIsLoading(false);
//         setCarList(reverse(data));
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchCars = () => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carinformation`, { headers })
    .catch((error) => console.log(error));
};

export const createCar = (values) => {
  const data = JSON.stringify(values);
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return post(`${URL}/api/carinformation`, data, { headers })
    .catch((error) => {
      console.log('error', error);
    });
};

// export const fetchOtherUsersCars = ({
//   isLoading, setIsLoading, setCarList, userId,
// }) => {
//   if (isLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carinformation/get-users-cars/${userId}`, { headers })
//       .then(({ data }) => {
//         setIsLoading(false);
//         setCarList(reverse(data));
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchOtherUsersCars = (userId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carinformation/get-users-cars/${userId}`, { headers })
    .catch((error) => console.log(error));
};

// export const fetchCarInfo = ({
//   carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo,
// }) => {
//   if (isCarInfoLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carinformation/get-carinfo/${carInfoId}`, { headers })
//       .then(({ data }) => {
//         setIsCarInfoLoading(false);
//         setCarInfo(data || {});
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };

export const fetchCarInfo = (carInfoId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carinformation/get-carinfo/${carInfoId}`, { headers })
    .catch((error) => console.log(error));
};

// export const updateCarInfo = (carInfo, setIsCarInfoLoading) => {
//   const data = JSON.stringify(carInfo);

//   const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//   return put(`${URL}/api/carinformation/${carInfo.Id}`, data, { headers })
//     .then(({ status }) => {
//       if (status === 200) setIsCarInfoLoading(true);
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });
// };

export const updateCarInfo = (carInfo) => {
  const data = JSON.stringify(carInfo);
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return put(`${URL}/api/carinformation/${carInfo.Id}`, data, { headers })
    .catch((error) => {
      console.log('error', error);
    });
};

export const fetchOtherCarInfo = ({
  carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo,
}) => {
  if (isCarInfoLoading) {
    const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
    get(`${URL}/api/carinformation/get-other-carinfo/${carInfoId}`, { headers })
      .then(({ data }) => {
        setIsCarInfoLoading(false);
        setCarInfo(data || {});
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const createExpense = ({ CarInformationId, Expense, Cost }, setIsCarExpensesLoading) => {
  const data = JSON.stringify({
    CarInformationId,
    Expense,
    Cost,
  });

  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  post(`${URL}/api/carexpenses`, data, { headers })
    .then(({ status }) => {
      if (status === 201) setIsCarExpensesLoading(true);
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export const updateExpense = ({ Id, Expense, Cost }, setIsCarExpensesLoading) => {
  const data = JSON.stringify({
    Id,
    Expense,
    Cost,
  });

  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  put(`${URL}/api/carexpenses/${Id}`, data, { headers })
    .then(({ status }) => {
      if (status === 204) setIsCarExpensesLoading(true);
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export const deleteExpense = (Id, setIsCarExpensesLoading) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  const requestOptions = {
    method: 'DELETE',
    headers,
    redirect: 'follow',
  };

  fetch(`${URL}/api/carexpenses/${Id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => Number(result) === 200 && setIsCarExpensesLoading(true))
    .catch((error) => console.log('error', error));

  // _delete(`${URL}/api/carexpenses/${Id}`,  {params: {Id}}, {headers})
  //   .then(({status}) => {
  //     if (status === 200) setIsCarExpensesLoading(true)
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   });
};

export const hasSubscription = (setNotifications) => {
  if (window.Notification && window.Notification.permission === 'granted') {
    const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
    const urlBase64ToUint8Array = (base64String) => {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+') // .replace(/\-/g, '+') 
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    };

    navigator.serviceWorker.ready
      .then((swreg) => {
        if (swreg) {
          const vapidPublicKey = 'BGtbGS02vyTs8DEeNMU-qkk06y8G_hftexcb9ckqBd8F4bolTd7E5FKhcM7JSOqL-TiVOP-lmxXLB5MjnQDEVeA';
          const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
          return swreg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey,
          });
        }
      })
      .then((subscription) => {
        post(`${URL}/api/websubscriptions/check-subscription`, subscription, { headers })
          .then(({ data }) => setNotifications(data))
          .catch((error) => console.log(error));
      });
  }
};

// export const fetchCarImages = ({
//   isImagesLoaded, setIsImagesLoaded, setCarImages, carInfoId,
// }) => {
//   if (isImagesLoaded) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carimages/getcars/${carInfoId}`, { headers })
//       .then(({ data }) => {
//         setIsImagesLoaded(false);
//         setCarImages(data);
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchCarImages = (carInfoId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carimages/getcars/${carInfoId}`, { headers })
    .catch((error) => console.log(error));
};

// export const fetchCarStatus = ({
//   isCarStatusLoading, setIsCarStatusLoading, setCarStatus, carInfoId,
// }) => {
//   if (isCarStatusLoading) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/carstatus/${carInfoId}`, { headers })
//       .then(({ data }) => {
//         setIsCarStatusLoading(false);
//         setCarStatus(data);
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchCarStatus = (carInfoId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/carstatus/${carInfoId}`, { headers })
    .catch((error) => console.log(error));
};

export const updateCarStatus = (carStatus, setIsCarStatusLoading) => {
  const data = JSON.stringify(carStatus);

  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return put(`${URL}/api/carstatus`, data, { headers })
    .then(() => setIsCarStatusLoading(true))
    .catch((error) => {
      console.log('error', error);
    });
};

// export const fetchUserPermission = ({
//   isUserPermissionsLoaded, setIsUserPermissionsLoaded, setUserHasWritePermissions, carInfoId,
// }) => {
//   if (isUserPermissionsLoaded) {
//     const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
//     get(`${URL}/api/caraccess/get-permissions/${carInfoId}`, { headers })
//       .then(({ data }) => {
//         setIsUserPermissionsLoaded(false);
//         setUserHasWritePermissions(data);
//       })
//       .catch((error) => console.log(error));
//   }
// };

export const fetchUserPermission = (carInfoId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/caraccess/get-permissions/${carInfoId}`, { headers })
    .catch((error) => console.log(error));
};

export const deleteCarInformation = (carInfoId, setIsCarExpensesLoading) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  const requestOptions = {
    method: 'DELETE',
    headers,
    redirect: 'follow',
  };

  return fetch(`${URL}/api/carinformation/${carInfoId}`, requestOptions)
    .catch((error) => console.log('error', error));

  // _delete(`${URL}/api/carexpenses/${Id}`,  {params: {Id}}, {headers})
  //   .then(({status}) => {
  //     if (status === 200) setIsCarExpensesLoading(true)
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   });
};

export const fetchUsersWithCarAccess = (carId) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return get(`${URL}/api/caraccess/get-all-car-permissions/${carId}`, { headers })
    .catch((error) => console.log(error));
};

export const giveUserCarPermissions = (data) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return post(`${URL}/api/caraccess/give-car-access`, data, { headers })
    .catch((error) => {
      console.log('error', error);
    });
};

export const editCarAccess = (data) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };
  return put(`${URL}/api/caraccess`, data, { headers })
    .catch((error) => {
      console.log('error', error);
    });
};

export const removeUserCarPermissions = (data) => {
  const headers = { 'Content-Type': 'application/json', token: getCookie('token') };

  const body = JSON.stringify(data);
  const requestOptions = {
    body,
    method: 'DELETE',
    headers,
    redirect: 'follow',
  };

  return fetch(`${URL}/api/caraccess/remove-user-permissions`, requestOptions)
    .catch((error) => console.log('error', error));
};
// -------------------------------------------------------------
// let host = null;
// if (window.location.hostname === 'localhost') {
//   host = 'http://localhost:5000';
// } else {
//   // host = 'http://uriel.sellingcrap.com';
//   host = 'https://be-carlist.herokuapp.com';
// }

// export const url = host;

// export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
//   if (!isLoaded) {
//     get(`${url}/fetchcars`)
//     .then((response) => {
//       setLoaded(true);
//       setCarList(response.data.reverse());
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };

// export const fetchCarInfo = ({carId, isCarInfoLoaded, setIsCarInfoLoaded, setCarInfo}) => {
//   if (!isCarInfoLoaded) {
//     get(`${url}/carinfo/${carId}`)
//     .then((response) => {
//       setIsCarInfoLoaded(true);
//       setCarInfo(response.data);
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };

// export const fetchCarImages = ({carId, isImagesLoaded, setIsImagesLoaded, setCarImages}) => {
//   if (!isImagesLoaded) {
//     get(`${url}/carimages/${carId}`)
//     .then((response) => {
//       setIsImagesLoaded(true);
//       setCarImages(response.data);
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };

// export const fetchCarExpenses = ({carId, isExpensesLoaded, setIsExpensesLoaded, setExpenses}) => {
//   if (!isExpensesLoaded) {
//     get(`${url}/loadexpenses/${carId}`)
//     .then((response) => {
//       setIsExpensesLoaded(true);
//       console.log(response.data);
//       setExpenses(response.data);
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };

// export const deleteCarExpense = (expenseId, state) => {
//   const formData = new FormData();
//   formData.append('expenseId', expenseId);

//   post(`${url}/deleteexpense/${expenseId}`, formData, {
//     headers: {
//     'Content-Type': 'application/json',
//     "Access-Control-Allow-Origin": "*",
//     'Accept': '*',
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//     state(false);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// };

// export const fetchCarStatus = ({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus}) => {
//   if (!isCarStatusLoaded) {
//     get(`${url}/carstatus/${carId}`)
//     .then((response) => {
//       setIsCarStatusLoaded(true);
//       setCarStatus(response.data);
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };

// export const fetchPartners = (partner, setPartners) => {
//   if (!partner.length) {
//     get(`${url}/fetchpartners`)
//     .then((response) => {
//       setPartners(response.data)
//     })           
//     .catch((error) => {
//         console.log(error);
//     })
//   }
// };
