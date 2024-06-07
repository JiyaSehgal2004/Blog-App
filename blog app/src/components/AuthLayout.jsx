// protected container

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// The authStatus variable holds the authentication status fetched from the Redux store. It could be a boolean value (true or false) indicating whether the user is authenticated.


// The authentication prop in the Protected component allows you to specify whether authentication is required (true) or not (false) for accessing the protected route.
// If authentication is true, it means the protected route requires authentication.
// If authentication is false, it means the protected route does not require authentication (it's an unprotected route).

// Logic in useEffect:
// The useEffect hook in the Protected component checks the authentication status (authStatus) against the required authentication status (authentication prop).
// If authentication is true and authStatus is not equal to true, it navigates the user to the login page (/login route), assuming authentication is required to access the protected route.
// If authentication is false and authStatus is not equal to false, it navigates the user to the home page (/ route), assuming it's an unprotected route.
// Behavior Explanation:

// If authentication is set to true and authStatus is also true, the logic will not navigate the user anywhere because the condition authStatus !== authentication will not be met.
// Similarly, if authentication is set to false and authStatus is also false, the logic will also not navigate the user anywhere for the same reason.
// In your code snippet, you may want to adjust the logic in the useEffect hook based on your specific requirements regarding how to handle cases where the authentication status matches the required authentication status. You can modify the logic to include additional checks or actions as needed.

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    
    useEffect(() => {

        // if(authStatus === true){
        //     navigate("/")
        // }
        // else if(authStatus === false) {
        //     navigate("/login")
        // }

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
