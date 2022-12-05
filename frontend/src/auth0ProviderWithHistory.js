/**
* This class allows our authentication API to redirect the user as necessary upon login and logout 
* @author   David Asatryan
*/
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
    
    const navigate = useNavigate()
    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

    /**
    * Redirects the user to a callback link provided by the auth0 API
    * @param {Object} appstate an object provided by auth0 which contains the callback link
    */
    const onRedirectCallback = (appstate) => {
        navigate(appstate?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider
            domain = {domain}
            clientId = {clientId}
            redirectUri = {window.location.origin}
            onRedirectCallback = {onRedirectCallback}
            cacheLocation = {"localstorage"}
            >
                {children}
            </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory