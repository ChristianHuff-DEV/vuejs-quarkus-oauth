import Vue from 'vue'

/**
 * Event fired once a user logged into the application.
 */
const USER_LOGGED_IN_EVENT = 'USER_LOGGED_IN_EVENT'

/**
 * Event fired once a user logged into the application.
 */
const USER_LOGGED_OUT_EVENT = 'USER_LOGGED_OUT_EVENT'

/**
 * Create an event bus and make it available.
 *
 * An event bus is technically just a vue instance which we use to "emit" events to and listen to them.
 */
const EventBus = new Vue()

/**
 * Fire an event that a user logged in.
 */
export var fireUserLoggedInEvent = () => {
  console.log('fireUserLoggedInEvent')
  EventBus.$emit(USER_LOGGED_IN_EVENT)
}

/**
 * Register a function to be executed when the user logged in event is fired.
 * @param {Function} callback
 */
export var registerUserLoggedInEventListener = (callback) => {
  console.log('registerUserLoggedInEventListener')
  EventBus.$on(USER_LOGGED_IN_EVENT, callback)
}

/**
 * Fire an event that a user logged out.
 */
export var fireUserLoggedOutEvent = () => {
  console.log('fireUserLoggedOutEvent')
  EventBus.$emit(USER_LOGGED_OUT_EVENT)
}

/**
 * Register a function to be executed when the user logged out event is fired.
 *
 * @param {Function} callback
 */
export var registerUserLoggedOutEventListener = (callback) => {
  console.log('registerUserLoggedOutEventListener')
  EventBus.$on(USER_LOGGED_OUT_EVENT, callback)
}
