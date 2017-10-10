import React from 'react'
import { connect, Provider } from 'react-redux'
import { Actions, Lightbox, Modal, Router, Scene } from 'react-native-router-flux'


import store from './store'

import EventList from './components/EventList'
import EventDetails from './components/EventDetails'


const ConnectedRouter = connect()( Router )


const Scenes = Actions.create(
  <Lightbox hideNavBar headerMode='none'>
    <Scene key="root">
      <Scene key="list" initial component={ EventList } />
    </Scene>
    <Modal key="details" component={ EventDetails } />
  </Lightbox>
)


const App = () =>
  <Provider store={ store }>
    <ConnectedRouter scenes={ Scenes } />
  </Provider>


export default App
