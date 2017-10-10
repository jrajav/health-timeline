import React from 'react'
import { StyleSheet, KeyboardAvoidingView, View, Text } from 'react-native'
import TextField from 'react-native-md-textinput'
import { assoc, merge } from 'ramda'


import { MKRangeSlider } from 'react-native-material-kit'


import { setEvent } from '../../actions/events'


const backgroundColor = '#fff'
const transparentColor = 'rgba(0,0,0,0.5)'


const styles = StyleSheet.create( {
  lightboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  boxContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: transparentColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 18
  }
} )


const BloodEventDetails = ( { event, dispatch } ) => {
  const handleChangeTitle = ( title ) => {
    dispatch( setEvent( assoc( 'title', title, event ) ) )
  }

  const handleChangeBlood = ( value ) => dispatch( setEvent( merge( event, {
    systolic: value.max,
    diastolic: value.min
  } ) ) )

  return (
    <KeyboardAvoidingView behavior='height' style={ styles.boxContainer }>
      <View style={ styles.lightboxContainer }>
        <View style={ styles.container }>
          <TextField
            multiline
            autoGrow
            label='Name'
            style={ styles.titleInput }
            onChangeText={ handleChangeTitle }
            value={ event.title }
            highlightColor={ '#00e676' }
          />
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
              onChange={ handleChangeBlood }
              step={ 1 }
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}


export default BloodEventDetails
