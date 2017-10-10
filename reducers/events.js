import { handleActions } from 'redux-actions'
import { update } from 'ramda'


import { SET_EVENTS, SET_EVENT } from '../actions/events'


const eventsInitialState = [
  {
    key: 'abc',
    time: '12:49',
    type: 'simple',
    title: 'Event 1',
    description: 'Description 1'
  },
  {
    key: 'def',
    time: '16:33',
    type: 'blood',
    title: 'Blood Pressure Reading',
    systolic: 120,
    diastolic: 70
  }
]

const events = handleActions( {

  [ SET_EVENTS ]: ( state, action ) => action.payload,

  [ SET_EVENT ]: ( state, action ) => {
    const index = state.findIndex( ( event ) => event.key === action.payload.key )

    return update( index, action.payload, state )
  }

}, eventsInitialState )


export default events
