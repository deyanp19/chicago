const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
//create get request
async function getRequest(endpoint, jwt) {
  const result = await fetch(ApiUrl + endpoint);
  return result;
}

async function getUsers(data) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(ApiUrl + "api/users", options);

  return result;
}

async function getArticles(id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
  };
  const result = await fetch(ApiUrl + `api/posts/${id}`, options);

  return result;
};


async function postUpload(data) {
  console.log('deyan',Object.fromEntries(data))
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: data,
  };
  const result = await fetch(ApiUrl + "api/uploads", options);

  return result;
};

async function postLog(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(ApiUrl + "api/logs", options);

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

async function deleteArticles(data) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: JSON.stringify({"ids":data}),
  };
  
  const result = await fetch(ApiUrl + "api/posts", options);

  return result;
}

async function deleteUsers(data) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": localStorage.getItem('authToken')
    },
    body: JSON.stringify({"ids":data}),
  };
  
  const result = await fetch(ApiUrl + "api/users", options);

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

async function updateRequest(data) {}

//delete request
async function deleteRequest(id) {}

export default {
  getUsers,
  postLog,
  getRequest,
  postArticle,
  updateRequest,
  deleteArticles,
  deleteUsers,
  loginRequest,
  signUpRequest,
  postUpload,
};
