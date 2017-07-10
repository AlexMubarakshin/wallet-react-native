import React, { Component } from 'react'
import Expo from 'expo'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './../config/colors'
import DrawerButton from './drawerButton'

export default class Account extends Component {

  render() {
    return (
      <View style={styles.options}>
        <View style={styles.left}>
          {this.props.drawer ?
            <DrawerButton navigation={this.props.navigation} /> :
            null
          }
          {this.props.back ?
            <TouchableOpacity style={{ padding: 10 }}>
              <Icon
                name="ios-arrow-back"
                size={35}
                color="white"
                style={{ paddingLeft: 10 }}
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity> :
            null
          }
        </View>
        <View style={styles.title}>
          {this.props.title ?
            <Text style={styles.titleText}>
              {this.props.title}
            </Text> :
            null
          }
        </View>
        <View style={styles.rightIcon}>
          {this.props.right ?
            <TouchableOpacity style={{ padding: 10 }}>
              <Icon
                name="ios-qr-scanner-outline"
                size={30}
                color="white"
                style={{ paddingRight: 10 }}
                onPress={() => this.props.navigation.navigate('QRcodeScanner')}
              />
            </TouchableOpacity> :
            null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    width: "100%",
    flexDirection: 'row',
    backgroundColor: Colors.lightblue,
    paddingTop: Expo.Constants.statusBarHeight,
    height: 55 + Expo.Constants.statusBarHeight,
  },
  left: {
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon : {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
  },
})
