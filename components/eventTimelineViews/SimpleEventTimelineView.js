import React from 'react'
import { StyleSheet, View, Text } from 'react-native'


const styles = StyleSheet.create( {
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    paddingTop: 0,
    marginTop: 0
  },
  description: {
    marginTop: 10,
    fontFamily: 'Roboto'
  }
} )


const SimpleEventTimelineView = ( { event } ) =>
  <View>
    <Text style={ styles.title }>{ event.title }</Text>
    <Text style={ styles.description }>{ event.description }</Text>
  </View>


export default SimpleEventTimelineView
