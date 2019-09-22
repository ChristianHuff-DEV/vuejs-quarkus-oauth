import { UserManager, WebStorageStateStore } from 'oidc-client'
import { fireUserLoggedInEvent, fireUserLoggedOutEvent } from './eventBus'

/**
 * Config for the oidc client.
 */
const settings = {
  // Where the tokens will be stored
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  // URL to the authentication server (including realm)
  authority: 'http://localhost:8180/auth/realms/auth-example',
  // The name of the client in Keycloak setup for this service
  client_id: 'webclient-service',
  // Where to redirect the user to after successful authentication
  redirect_uri: 'http://localhost:8080/login',
  // Where to redirect the user to after logging the user out
  post_logout_redirect_uri: 'http://localhost:8080/logout',
  // Indicate the the authorization code flow should be used
  response_type: 'code',
  // "openid" tells the server that this client uses oidc for authentication
  scope: 'openid',
  // Enable automatic (silent) renewal of the access token
  automaticSilentRenew: true
}

let userManager = new UserManager(settings)

/**
 * Class to encapsulate all authentication related logic.
 */
class AuthService {
  /**
   * Initate the login process.
   */
  login () {
    userManager.signinRedirect()
      .catch(error => console.log(error))
  }

  logout () {
    userManager.signoutRedirect()
      .then(() => console.log('User logged out'))
      .catch(error => console.log(error))
  }

  /**
   * Handles the redirect from the OAuth server after a user logged in.
   */
  handleLoginRedirect () {
    // Returns a promise
    return userManager.signinRedirectCallback()
  }

  /**
   * Handles the redirect from the OAuth server after a user logged out.
   */
  handleLogoutRedirect () {
    return userManager.signoutRedirectCallback()
  }

  /**
   * Checks whether or not a user is currently logged in.
   *
   * Returns a promise which will be resolved to true/false or be rejected with an error.
   */
  isUserLoggedIn () {
    return new Promise((resolve, reject) => {
      userManager.getUser()
        .then(user => {
          if (user === null) {
            resolve(false)
          }
          resolve(true)
        })
        .catch(error => reject(error))
    })
  }

  /**
   * Get the profile data for the currently authenticated user.
   *
   * Returns an empty object if no user is logged in.
   */
  getProfile () {
    return new Promise((resolve, reject) => {
      userManager.getUser()
        .then(user => {
          if (user === null) {
            resolve(null)
          }
          resolve(user.profile)
        })
        .catch(error => reject(error))
    })
  }

  /**
   * Get the access token.
   *
   * Can be used to make requests to the backend.
   */
  getAccessToken () {
    return new Promise((resolve, reject) => {
      console.log('Get access token from user')
      userManager.getUser()
        .then(user => {
          console.log('Got access token from user')
          resolve(user.access_token)
        })
        .catch(error => reject(error))
    })
  }
}

/**
 * Event fired once a user logged in successfully or after an access token was refreshed successfully.
 */
userManager.events.addUserLoaded(() => fireUserLoggedInEvent())

/**
 * Event fired once a user logged out or the user was logged out since the access token could not be refreshed.
 */
userManager.events.addUserSignedOut(() => fireUserLoggedOutEvent())

/**
 * Create and expose an instance of the auth service.
 */
export const authService = new AuthService()

/**
 * Default export to register the authentication service in the global Vue instance.
 *
 * This allows us to reference it using "this.$auth" whenever we are inside of a Vue context.
 */
export default {
  install: function (Vue) {
    Vue.prototype.$auth = authService
  }
}
