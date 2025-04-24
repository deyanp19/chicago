

const ApiUrl = 'https://chicagotours.site/api'
//create get request
async function getRequest(endpoint,jwt){
    const result = await fetch(ApiUrl+endpoint)
    return result;
}

//post request
async function postRequest(data,endpoint) {
    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'*/*',
            'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODAxMzNkZDU3ODliNjM3NTJkNGExYzciLCJpYXQiOjE3NDQ5ODY5Mjd9.uM14JBNf8B8KdWCze6NBWFUPNUQVR5V-14ZYXljGDn8'
        },
        body:JSON.stringify(data)
    }
    const result = await fetch(ApiUrl+endpoint,options)
    const token = result.headers.get('x-auth-token');
   
    return result;
}
//put request
function updateRequest(data) {

}

//delete request
function deleteRequest(id) {
    
}


export default {
    getRequest,
    postRequest,
    updateRequest,
    deleteRequest
}