import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { MKRangeSlider } from 'react-native-material-kit'


const styles = StyleSheet.create( {
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    paddingTop: 0,
    marginTop: 0
  },
  slider: {
    flex: 1,
    marginLeft: 6
  },
  blood: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
} )


const BloodEventTimelineView = ( { event } ) =>
  <View>
    <Text style={ styles.title }>{ event.title }</Text>
    <View style={ styles.blood }>
      <Text>{ `${ Math.round( event.systolic ) } / ${ Math.round( event.diastolic ) }` }</Text>
      <MKRangeSlider
        style={ styles.slider }
        min={ 0 }
        max={ 190 }
        minValue={ event.diastolic }
        maxValue={ event.systolic }
        lowerTrackColor={ '#E91E63' }
        upperTrackColor={ '#d1d1d1' }
      />
    </View>
  </View>


export default BloodEventTimelineView
