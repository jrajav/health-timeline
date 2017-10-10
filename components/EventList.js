import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'


import { goDetails } from '../actions/events'

import Timeline from './Timeline'


const white = '#fff'
const darkGrey = '#212121'
const grey = '#9b9b9b'


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: white
  },
  header: {
    color: white,
    backgroundColor: darkGrey,
    fontFamily: 'monospace',
    alignSelf: 'flex-start',
    fontSize: 24
  },
  dot: {
    color: grey
  },
  list: {
    flex: 1,
    marginTop: 40
  }
} )


const EventList = ( { state, dispatch } ) => {
  const handleEventPress = ( details ) => {
    dispatch( goDetails( details.key ) )
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.header }>
        <Text>Health</Text><Text style={ styles.dot }>•</Text><Text>Timeline</Text>
      </Text>
      <Timeline
        style={ styles.list }
        data={ state.events }
        onEventPress={ handleEventPress }
      />
    </View>
  )
}


export default connect(
  ( state ) => ( { state } ),
  ( dispatch ) => ( { dispatch } )
)( EventList )
