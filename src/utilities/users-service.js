//importing everything from users-api
import * as usersAPI from './users-api'

//arg could be formData but it's really collecting userData, so we name it that
export async function signUp (userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    //this gets added to the call stack third, since it's called by the other line of code in SignUpForm.jsx
    const token = await usersAPI.signUp(userData)
    //persist the token in storage
    localStorage.setItem('token', token)

    // Baby step by returning whatever is sent back by the server
    return getUser()
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials)

    //persist token
    localStorage.setItem('token', token)

    return getUser()
}


export function getToken() {
    const token = localStorage.getItem('token')

    //If there is no token, it returns null
    if (!token){
        return null
    }
    //splitting the token string by the periods and then accessing the payload. Also parsing the JSON overall.
    const payload = JSON.parse(atob(token.split(".")[1]))
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        //removes token from localstorage
        localStorage.removeItem('token')
        //return null since we're removing the token from localstorage
        return null
    }
    return token
}

export function getUser() {
    const token = getToken() //either returns the token if exists and valid, or returns null
    //This is the same code as above for the atob, just in a ternary
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;

}

export function logOut() {
    localStorage.removeItem('token')
}

export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
      // checkToken returns a string, but let's
      // make it a Date object for more flexibility
      //This is an instance of the date
      .then(dateStr => new Date(dateStr));
  }