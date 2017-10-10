import { createAction } from 'redux-actions'
import { Actions } from 'react-native-router-flux'


export const SET_EVENTS = 'SET_EVENTS'
export const setEvents = createAction( SET_EVENTS )

export const SET_EVENT = 'SET_EVENT'
export const setEvent = createAction( SET_EVENT )

export const goDetails = ( key ) => () =>
  Actions.details( key )

export const goBack = () => () =>
  Actions.pop()
