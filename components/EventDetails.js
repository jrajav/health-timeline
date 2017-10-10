import React from 'react'
import { connect } from 'react-redux'

import SimpleEventDetails from './eventDetailsViews/SimpleEventDetails'
import BloodEventDetails from './eventDetailsViews/BloodEventDetails'


const EventDetails = ( { state: { events }, data, dispatch } ) => {
  const event = events.find( ( item ) => item.key === data )

  let component = null

  switch ( event.type ) {
    case 'simple':
      component = <SimpleEventDetails event={ event } dispatch={ dispatch } />
      break
    case 'blood':
      component = <BloodEventDetails event={ event } dispatch={ dispatch } />
      break
    default:
      break
  }

  return component
}


export default connect(
  ( state ) => ( { state } ),
  ( dispatch ) => ( { dispatch } )
)( EventDetails )
