import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'
import TextInput from './../../../components/textInput'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Verify mobile number',
  }

  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    }
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsMobileNumbers')
  }

  verify = async () => {
    let responseJson = await SettingsService.verifyMobile(this.state)

    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={75}>
        <View style={{ flex: 1 }}>
          <TextInput
            title="Enter OTP"
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(otp) => this.setState({ otp })}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={[styles.submit, { backgroundColor: '#ED675A' }]}
            onPress={() => this.reload()}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              Skip
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.submit}
            onPress={this.verify}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              Verify
            </Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submit: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3D95CE',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttons: {
    height: 65,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
})
