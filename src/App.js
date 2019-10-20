/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SendSMS from 'react-native-sms-x';
import Web3 from 'web3';
import { defaultProps } from 'react-native/Libraries/Components/Picker/Picker';
var Tx = require('ethereumjs-tx').Transaction;

web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/eda623b4a9664c5ba54a726541372946"));

const App = () => {
  const [ethAddress, setEthAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const sendSms = () => {
    web3.eth.getTransactionCount('0xD9fd232c6F93a541323dF7Af4DdF724149250F0E').then((nonce) => {
      let tx = new Tx({
        "from": new Buffer.from('3c250227150438ed372F93Bb01C51785281d9DEF', 'hex'),
        "nonce": nonce,
        // "gasPrice": 1,
        "gas": 200000,
        "to": new Buffer.from('780b7F58b201ac352fBD22654d04D82926386aF8', 'hex'),
        "value": '10000000',
        "chainId": 5777
      });
      tx.sign(new Buffer.from('2562fe54387b29ad63201f64f64c54647a58534b8b65d45e33efc057581bec64', 'hex'));

      var serializedTx = tx.serialize();

      SendSMS.send(
        123,
        '9920765114',
        JSON.stringify(serializedTx),
        // 'asdasd',
        (msg) => {
          console.log(msg);
        });

      // this has to be sent not the string converted part
      // console.log(serializedTx.length);
      console.log(serializedTx)
    });

  };
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginVertical: 16 }}>Offchain</Text>

      <View style={{ borderWidth: 1, marginVertical: 16, borderRadius: 8, paddingHorizontal: 4 }}>
        <TextInput
          placeholder="Enter ethereum address here"
          onChange={address => {
            setEthAddress(address);
          }}
        />
      </View>

      <View style={{ borderWidth: 1, marginVertical: 16, borderRadius: 8, paddingHorizontal: 4 }}>
        <TextInput
          placeholder="Enter amount to be sent"
          onChange={amt => {
            setAmount(amt);
          }}
        />
      </View>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: '#AAAAAA', marginVertical: 16, borderRadius: 8 }}
        onPress={() => { sendSms(); }}>
        <Text >Send</Text>
      </TouchableOpacity>
    </View>
  );
};

// export default App;

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Details')}}>
          <View>
            <Text>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: DetailsScreen,
},
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
