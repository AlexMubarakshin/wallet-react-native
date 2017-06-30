import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, AsyncStorage, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native'
import TransectionService from './../../services/transactionService'
import ResetNavigation from './../../util/resetNavigation'
import TextInput from './../../components/textInput'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Send money',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    console.log(params)
    this.state = {
      reference: params.reference,
      amount: 0,
      note: '',
    }
  }

  send = async() => {
    if (this.state.amount <= 0) {
      Alert.alert(
        'Invalid',
        'Enter valid amount',
        [[{ text: 'OK' }]]
      )
    }
    else {
      const data = await AsyncStorage.getItem('currency')
      const currency = JSON.parse(data)
      let amount = this.state.amount
      for (let i = 0; i < currency.divisibility; i++) {
        amount = amount * 10
      }
      Alert.alert(
        'Are you sure?',
        'Send ' + currency.symbol + this.state.amount + ' to ' + this.state.reference,
        [
          { text: 'Yes', onPress: () => this.transferConfirmed(amount) },
          { text: 'No', onPress: () => ResetNavigation.dispatchToSingleRoute(this.props.navigation, "Home"), style: 'cancel' },
        ]
      )
    }
  }

  transferConfirmed = async (amount) => {
    let responseJson = await TransectionService.sendMoney(amount, this.state.reference, this.state.note)
    if (responseJson.status === "success") {
      Alert.alert('Success',
        "Transaction successful",
        [{ text: 'OK', onPress: () => ResetNavigation.dispatchToSingleRoute(this.props.navigation, "Home") }])
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  amountChanged = (text) => {
    let amount = parseFloat(text)
    if (isNaN(amount)) {
      this.setState({ amount: 0 })
    }
    else {
      this.setState({ amount })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={85}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <TextInput
            title="Amount"
            placeholder="Enter amount here"
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={this.amountChanged}
          />
          <TextInput
            title="Note"
            placeholder="Enter note here"
            autoCapitalize="none"
            onChangeText={(note) => this.setState({ note })}
          />
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.send}>
          <Text style={{ color: 'white', fontSize: 18 }}>
            Send
          </Text>
        </TouchableHighlight>
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
    padding: 10,
    height: 65,
    backgroundColor: '#3C8DBC',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
