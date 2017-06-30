import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

export default class Account extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options} >
        <View style={styles.optionsElement}>
          <Text style={{ fontSize: 20, color: '#4D4D4D' }}>
            {this.props.mobile.number}
          </Text>
          {this.props.mobile.verified === true ?
            <Text style={{ fontSize: 15 }}>
              Verified
            </Text> :
            null
          }

          <View style={styles.buttons}>
            {this.props.mobile.verified !== true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: '#3C8DBC' }]}
                onPress={() => this.props.verify(this.props.mobile.number)} >
                <Text style={styles.buttonText}>
                  Verify
                </Text>
              </TouchableHighlight> :
              null
            }
            {this.props.mobile.primary === true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: '#03DBBB' }]}
                onPress={null} >
                <Text style={styles.buttonText}>
                  Primary
                </Text>
              </TouchableHighlight> :
              <TouchableHighlight
                style={[styles.button, { backgroundColor: '#3C8DBC' }]}
                onPress={() => this.props.makePrimary(this.props.mobile.id)} >
                <Text style={styles.buttonText}>
                  Make Primary
                </Text>
              </TouchableHighlight>
            }
            {this.props.mobile.primary !== true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: '#ED675A' }]}
                onPress={() => this.props.delete(this.props.mobile.id)} >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableHighlight> :
              null
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionsElement: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 6,
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
