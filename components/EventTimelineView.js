import React from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'


import SimpleEventTimelineView from './eventTimelineViews/SimpleEventTimelineView'
import BloodEventTimelineView from './eventTimelineViews/BloodEventTimelineView'


const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.select( {
      ios: 'System',
      android: 'Roboto'
    } ),
    letterSpacing: 0.5,
    paddingTop: 0,
    marginTop: 0
  }
} )


const EventTimelineView = ( { event } ) => {
  let component = <Text style={ styles.title }>{ event.title }</Text>

  switch ( event.type ) {
    case 'simple':
      component = <SimpleEventTimelineView event={ event } />
      break
    case 'blood':
      component = <BloodEventTimelineView event={ event } />
      break
    default:
      break
  }

  return (
    <View style={ styles.container }>
      { component }
    </View>
  )
}


export default EventTimelineView
