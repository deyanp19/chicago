const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
//create get request
async function getRequest(endpoint, jwt) {
  const result = await fetch(ApiUrl + endpoint);
  return result;
}

async function postArticle(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(ApiUrl + "api/posts", options);

  return result;
}

async function loginRequest(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(ApiUrl + "api/auth", options);

  return result;
}

async function signUpRequest(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(ApiUrl + "api/users", options);

  return result;
}
// async function postRequest(data,endpoint) {
//     const options = {
//         method:'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept':'*/*',
//             'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODAxMzNkZDU3ODliNjM3NTJkNGExYzciLCJpYXQiOjE3NDQ5ODY5Mjd9.uM14JBNf8B8KdWCze6NBWFUPNUQVR5V-14ZYXljGDn8'
//         },
//         body:JSON.stringify(data)
//     }
//     const result = await fetch(ApiUrl+endpoint,options)
//     const token = result.headers.get('x-auth-token');

//     return result;
// }
//put request
async function updateRequest(data) {}

//delete request
async function deleteRequest(id) {}

export default {
  getRequest,
  postArticle,
  updateRequest,
  deleteRequest,
  loginRequest,
  signUpRequest,
};
