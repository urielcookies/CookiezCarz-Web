import {get, post, put, delete as _delete} from "axios";
import {reverse} from 'lodash';

const URL = 'https://carlistapi.azurewebsites.net';

const getCookie = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//Sample usage
const headers = {'Content-Type': 'application/json', token: getCookie('token')};

export const loginUser = (userInfo, push, setErrorMessage) => {
  const data = JSON.stringify(userInfo);

  post(`${URL}/api/useraccounts/login`, data, {headers:  {'Content-Type': 'application/json'}})
    .then(({data, status}) => {
      if (status === 200 && data) {
        document.cookie = `token=${data}`;
        push('/home');
      } else setErrorMessage('Wrong email or password');
    })
    .catch((error) => {
      console.log('error', error)
      setErrorMessage('Wrong email or password')
    });
};

export const fetchActiveAccount = ({isActiveLoading, setIsActiveAccountLoading, setActiveAccount}) => {
  if (isActiveLoading) {
    const headers = {'Content-Type': 'application/json', token: getCookie('token')};
    get(`${URL}/api/useraccounts/getuserinfo`, {headers})
    .then(({data}) => {
      setIsActiveAccountLoading(false);
      setActiveAccount(data);
    })           
    .catch((error) => console.log(error))
  }
};

export const fetchCarExpenses = ({isCarExpensesLoading, setIsCarExpensesLoading, setCarExpenses, carInfoId}) => {
  if (isCarExpensesLoading) {
    const headers = {'Content-Type': 'application/json', token: getCookie('token')};
    get(`${URL}/api/carexpenses/${carInfoId}`, {headers})
    .then(({data}) => {
      setIsCarExpensesLoading(false);
      setCarExpenses(reverse(data));
    })           
    .catch((error) => console.log(error))
  }
};


export const fetchUsers = ({isUsersLoading, setIsUsersLoading, setUsers}) => {
  const headers = {'Content-Type': 'application/json', token: getCookie('token')};
  if (isUsersLoading) {
    get(`${URL}/api/caraccess/getusernames`, {headers})
    .then(({data}) => {
      setIsUsersLoading(false);
      setUsers(data);
    })           
    .catch((error) => console.log(error))
  }
};

export const fetchCars = ({isLoading, setIsLoading, setCarList}) => {
  if (isLoading) {
    get(`${URL}/api/carinformation`, {headers})
    .then(({data}) => {
      setIsLoading(false);
      setCarList(data);
    })           
    .catch((error) => console.log(error))
  }
};

export const fetchOtherUsersCars = ({isLoading, setIsLoading, setCarList, userId}) => {
  if (isLoading) {
    get(`${URL}/api/carinformation/get-users-cars/${userId}`, {headers})
    .then(({data}) => {
      setIsLoading(false);
      setCarList(data);
    })           
    .catch((error) => console.log(error))
  }
}

export const fetchCarInfo = ({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo}) => {
  if (isCarInfoLoading) {
    get(`${URL}/api/carinformation/get-carinfo/${carInfoId}`, {headers})
    .then(({data}) => {
      setIsCarInfoLoading(false);
      setCarInfo(data || {});
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const fetchOtherCarInfo = ({carInfoId, isCarInfoLoading, setIsCarInfoLoading, setCarInfo}) => {
  if (isCarInfoLoading) {
    get(`${URL}/api/carinformation/get-other-carinfo/${carInfoId}`, {headers})
    .then(({data}) => {
      setIsCarInfoLoading(false);
      setCarInfo(data || {});
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const createExpense = ({CarInformationId, Expense, Cost}, setIsCarExpensesLoading) => {
  var data = JSON.stringify({
    CarInformationId,
    Expense,
    Cost
  });

  var requestOptions = {
      method: 'POST',
      headers,
  };

  post(`${URL}/api/carexpenses`, data, requestOptions)
    .then(({status}) => {
      if (status === 201) setIsCarExpensesLoading(true);
    })
    .catch((error) => {
      console.log('error', error)
    });
};

export const updateExpense = ({Id, Expense, Cost}, setIsCarExpensesLoading) => {
  const headers = {'Content-Type': 'application/json', token: getCookie('token')};
  var data = JSON.stringify({
    Id,
    Expense,
    Cost
  });

  put(`${URL}/api/carexpenses/${Id}`, data, {headers})
    .then(({status}) => {
      if (status === 204) setIsCarExpensesLoading(true)
    })
    .catch((error) => {
      console.log('error', error)
    });
};

export const deleteExpense = (Id, setIsCarExpensesLoading) => {
  const headers = {'Content-Type': 'application/json', token: getCookie('token')};
  const requestOptions = {
    method: 'DELETE',
    headers,
    redirect: 'follow'
  };

  fetch(`${URL}/api/carexpenses/${Id}`, requestOptions)
    .then(response => response.text())
    .then(result => Number(result) === 200 && setIsCarExpensesLoading(true))
    .catch(error => console.log('error', error));

  // _delete(`${URL}/api/carexpenses/${Id}`,  {params: {Id}}, {headers})
  //   .then(({status}) => {
  //     if (status === 200) setIsCarExpensesLoading(true)
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   });
};

// -------------------------------------------------------------
let host = null;
if (window.location.hostname === 'localhost') {
  host = 'http://localhost:5000';
} else {
  // host = 'http://uriel.sellingcrap.com';
  host = 'https://be-carlist.herokuapp.com';
}

export const url = host;

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

export const fetchCarImages = ({carId, isImagesLoaded, setIsImagesLoaded, setCarImages}) => {
  if (!isImagesLoaded) {
    get(`${url}/carimages/${carId}`)
    .then((response) => {
      setIsImagesLoaded(true);
      setCarImages(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

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

export const deleteCarExpense = (expenseId, state) => {
  const formData = new FormData();
  formData.append('expenseId', expenseId);

  post(`${url}/deleteexpense/${expenseId}`, formData, {
    headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Accept': '*',
    }
  })
  .then(function (response) {
    console.log(response);
    state(false);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchCarStatus = ({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus}) => {
  if (!isCarStatusLoaded) {
    get(`${url}/carstatus/${carId}`)
    .then((response) => {
      setIsCarStatusLoaded(true);
      setCarStatus(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const fetchPartners = (partner, setPartners) => {
  if (!partner.length) {
    get(`${url}/fetchpartners`)
    .then((response) => {
      setPartners(response.data)
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};
