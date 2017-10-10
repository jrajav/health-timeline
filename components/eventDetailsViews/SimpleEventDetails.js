import React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import TextField from 'react-native-md-textinput'
import { assoc } from 'ramda'


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
  },
  descriptionInput: {
    fontSize: 18
  }
} )


const SimpleEventDetails = ( { event, dispatch } ) => {
  const handleChangeTitle = ( title ) => {
    dispatch( setEvent( assoc( 'title', title, event ) ) )
  }

  const handleChangeDescription = ( description ) => {
    dispatch( setEvent( assoc( 'description', description, event ) ) )
  }

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
          <TextField
            multiline
            autoGrow
            label='Description'
            style={ styles.descriptionInput }
            onChangeText={ handleChangeDescription }
            value={ event.description }
            highlightColor={ '#00e676' }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}


export default SimpleEventDetails
