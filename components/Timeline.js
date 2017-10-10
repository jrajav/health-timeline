import React, { Component } from 'react'

import {
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'


import EventTimelineView from './EventTimelineView'


const ds = new ListView.DataSource( {
  rowHasChanged: ( r1, r2 ) => r1 !== r2,
  sectionHeaderHasChanged: ( s1, s2 ) => s1 !== s2
} )


const defaultCircleSize = 16
const defaultCircleColor = '#00e676'
const defaultLineWidth = 2
const defaultLineColor = '#00e676'
const defaultTimeTextColor = 'black'
const defaultDotColor = 'white'
const defaultInnerCircle = 'none'
const separatorColor = '#fff'


const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  listview: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  timeContainer: {
    minWidth: 45,
    marginTop: -2
  },
  time: {
    textAlign: 'right',
    color: defaultTimeTextColor,
    fontFamily: 'monospace'
  },
  timeWrapper: {
    alignItems: 'flex-end'
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: 'absolute',
    left: -8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor
  },
  rowDetail: {
    marginTop: -2,
    paddingBottom: 10
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: separatorColor,
    marginTop: 10,
    marginBottom: 10
  }
} )


export default class Timeline extends Component {
  constructor( props, context ) {
    super( props, context )

    this._renderRow = this._renderRow.bind( this )

    this.renderTime = ( this.props.renderTime || this._renderTime ).bind( this )
    this.renderDetail = ( this.props.renderDetail || this._renderDetail ).bind( this )
    this.renderCircle = ( this.props.renderCircle || this._renderCircle ).bind( this )
    this.renderEvent = this._renderEvent.bind( this )
    this.isRenderSeparator = this.props.separator || true
    this.onEventPress = this.props.onEventPress

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows( this.props.data ),
      x: 0,
      width: 0
    }
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      data: nextProps.data,
      dataSource: ds.cloneWithRows( nextProps.data )
    } )
  }

  _renderRow( rowData, sectionID, rowID ) {
    return (
      <View key={ rowID }>
        <View style={ [ styles.rowContainer, this.props.rowContainerStyle ] }>
          { this.renderTime( rowData ) }
          { this.renderEvent( rowData ) }
          { this.renderCircle( rowData ) }
        </View>
      </View>
    )
  }

  _renderTime( rowData ) {
    return (
      <View style={ styles.timeWrapper }>
        <View style={ [ styles.timeContainer, this.props.timeContainerStyle ] }>
          <Text style={ [ styles.time, this.props.timeStyle ] }>{rowData.time}</Text>
        </View>
      </View>
    )
  }

  _renderEvent( rowData, sectionID, rowID ) {
    const lineWidth = rowData.lineWidth ? rowData.lineWidth : this.props.lineWidth
    const isLast = this.state.data.slice( -1 )[ 0 ] === rowData
    const lineColor = isLast
      ? ( 'rgba(0,0,0,0)' )
      : ( rowData.lineColor ? rowData.lineColor : this.props.lineColor )

    const opStyle = {
      borderColor: lineColor,
      borderLeftWidth: lineWidth,
      borderRightWidth: 0,
      marginLeft: 20,
      paddingLeft: 20
    }

    const handleLayout = ( evt ) => {
      if ( !this.state.x && !this.state.width ) {
        const { x, width } = evt.nativeEvent.layout

        this.setState( { x, width } )
      }
    }

    const handlePress = () => this.props.onEventPress ? this.props.onEventPress( rowData ) : null


    return (
      <View style={ [ styles.details, opStyle ] } onLayout={ handleLayout }>
        <TouchableNativeFeedback
          disabled={ !this.props.onEventPress }
          style={ [ this.props.detailContainerStyle ] }
          onPress={ handlePress }
        >
          <View style={ styles.rowDetail }>
            { this.renderDetail( rowData, sectionID, rowID ) }
          </View>
        </TouchableNativeFeedback>
        <View>
          { this._renderSeparator() }
        </View>
      </View>
    )
  }

  _renderDetail( rowData ) {
    return <EventTimelineView event={ rowData } />
  }

  _renderCircle( rowData ) {
    const circleSize =
      rowData.circleSize
        ? rowData.circleSize
        : this.props.circleSize
          ? this.props.circleSize
          : defaultCircleSize
    const circleColor =
      rowData.circleColor
        ? rowData.circleColor
        : this.props.circleColor
          ? this.props.circleColor
          : defaultCircleColor
    const lineWidth =
      rowData.lineWidth
        ? rowData.lineWidth
        : this.props.lineWidth
          ? this.props.lineWidth
          : defaultLineWidth

    const circleStyle = {
      width: this.state.x ? circleSize : 0,
      height: this.state.x ? circleSize : 0,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      left: this.state.x - ( circleSize / 2 ) + ( ( lineWidth - 1 ) / 2 )
    }

    let innerCircle = null

    switch ( this.props.innerCircle ) {
      case 'icon':
        const iconSource = rowData.icon ? rowData.icon : this.props.icon
        const iconStyle = {
          height: circleSize,
          width: circleSize
        }

        innerCircle = <Image source={ iconSource } style={ [ iconStyle, this.props.iconStyle ] } />
        break
      case 'dot':
        const dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor:
            rowData.dotColor
              ? rowData.dotColor
              : this.props.dotColor
                ? this.props.dotColor
                : defaultDotColor
        }

        innerCircle = <View style={ [ styles.dot, dotStyle ] } />
        break
      default:
        break
    }

    return (
      <View style={ [ styles.circle, circleStyle, this.props.circleStyle ] }>
        { innerCircle }
      </View>
    )
  }

  _renderSeparator() {
    if ( this.isRenderSeparator ) {
      return (
        <View style={ [ styles.separator, this.props.separatorStyle ] } />
      )
    } else {
      return null
    }
  }


  render() {
    return (
      <View style={ [ styles.container, this.props.style ] }>
        <ListView
          style={ [ styles.listview ] }
          dataSource={ this.state.dataSource }
          renderRow={ this._renderRow }
          automaticallyAdjustContentInsets={ false }
          { ...this.props.options }
        />
      </View>
    )
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle
}
