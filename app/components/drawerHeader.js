import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, TouchableHighlight, Image, Text } from 'react-native';

export default class DrawerHeader extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      userInfo: {},
    }

    this.getUserInfo()
  }

  getUserInfo = () => {
    AsyncStorage.getItem('user').then((value) => {
      this.setState({ 'userInfo': JSON.parse(value) || {} });
    })
  }

  render() {
    return (
      <View style={styles.row}>
        <TouchableHighlight
          style={styles.button}>
            <Image
              style={styles.stretch}
              source={{ uri: this.state.userInfo.profile || './../../assets/icons/profile_1.png'}}
            />

        </TouchableHighlight>
        <View style={styles.col}>
          <Text style={styles.nameText}>
            {(this.state.userInfo.first_name || '') + ' ' + (this.state.userInfo.last_name || '')}
          </Text>
          <Text style={styles.emailText}>
            {this.state.userInfo.email || ''}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 15,
  },
  col: {
    flexDirection: "column",
    marginLeft: 15,
  },
  stretch: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    color: '#C0C9CF',
    fontSize: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  emailText: {
    color: '#C0C9CF',
    fontSize: 11,
    marginTop: 10,
  },
});
