/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
        secoundValue: 0,
        firstValue: 0,
        selectedSymbol: null,
        decimalUsed:false

    }
  }

  _onInputButtonPressed=(input)=> {
    if((typeof input)=='string') {
      return this._handleStringInput(input)
    } else {
      return this._handleNumberInput(input)
    }
  }
  
  _handleNumberInput(num) {
    if (!this.state.decimalUsed) {
      let firstValue = (this.state.firstValue * 10.0) + num;
      this.setState({
        firstValue: firstValue,
      });
    } else {
      if ((this.state.firstValue.toString()).indexOf(".") == -1) {
        let firstValue = (this.state.firstValue).toString() + "." + num.toString();
        this.setState({
          firstValue: firstValue,
        });
      } else {
        let firstValue = (this.state.firstValue).toString() + num.toString();
        this.setState({
          firstValue: firstValue,
        });
      }
    }
  }
  
  _handleStringInput(str) { 
    if(str != "="){
      this.setState({
          selectedSymbol: str,
          secoundValue:this.state.firstValue,
          firstValue:0,
          decimalUsed:false
      });
    } else {
      let symbol = this.state.selectedSymbol,
      firstValue = this.state.firstValue,
      secoundValue = this.state.secoundValue;
  
      if (!symbol) {
        return;
      }
      let wynik = eval(secoundValue + symbol + firstValue);
      if((wynik.toString()).indexOf(".")==-1){
        this.setState({
          secoundValue: 0,
          firstValue: wynik,
          selectedSymbol: null,
          decimalUsed:false
        });
      }else{
        this.setState({
          secoundValue: 0,
          firstValue: eval(secoundValue + symbol + firstValue),
          selectedSymbol: null,
          decimalUsed:true
        });
      }
    }
  }
  
  _handleDecimal=()=>{
    this.setState({
      decimalUsed:true,
    });
  }
  
  _resetValues=()=>{
    this.setState({
      secoundValue: 0,
      firstValue: 0,
      selectedSymbol: null,
      decimalUsed:false
    });
  }

  render() {
    return (
      <View style={styles.backgr}>
        <View style={styles.displayView}>
          <Text style={styles.displayText}>{this.state.firstValue}</Text>
        </View>
        <TouchableOpacity style={styles.acButton} onPress={this._resetValues}>
          <Text style={styles.numberButtonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.freeSpace} disabled='false' />
        <TouchableOpacity style={styles.resultButton} onPress={this._onInputButtonPressed.bind(this, "/")}>
          <Text style={styles.numberButtonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 7)}>
          <Text style={styles.numberButtonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 8)}>
          <Text style={styles.numberButtonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 9)}>
          <Text style={styles.numberButtonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultButton} onPress={this._onInputButtonPressed.bind(this, "*")}>
          <Text style={styles.numberButtonText}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 4)}>
          <Text style={styles.numberButtonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 5)}>
          <Text style={styles.numberButtonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 6)}>
          <Text style={styles.numberButtonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultButton} onPress={this._onInputButtonPressed.bind(this, "-")}>
          <Text style={styles.numberButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 1)}>
          <Text style={styles.numberButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 2)}>
          <Text style={styles.numberButtonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._onInputButtonPressed.bind(this, 3)}>
          <Text style={styles.numberButtonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultButton} onPress={this._onInputButtonPressed.bind(this, "+")}>
          <Text style={styles.numberButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zeroButton} onPress={this._onInputButtonPressed.bind(this, 0)}>
          <Text style={styles.numberButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={this._handleDecimal} disabled={this.decimalUsed}>
          <Text style={styles.numberButtonText}>,</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultButton} onPress={this._onInputButtonPressed.bind(this, "=")}>
          <Text style={styles.numberButtonText}>=</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  backgr: {
    flexDirection: 'row',
    flexWrap: "wrap",
    backgroundColor: '#545557',
  },

  inputBackGr: {
    alignItems: 'flex-start',
    
    flexDirection: 'row',
    flexWrap: "wrap",
    backgroundColor: '#545557',
  },

  numberButton: {
    alignItems: 'flex-start',
    margin: 2,
    height: (screenHeight - 24) / 6,
    width: (screenWidth - 16) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7E7F81'
  },

  zeroButton: {
    alignItems: 'flex-start',
    height: (screenHeight - 24) / 6,
    width: (screenWidth - 8) / 2,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7E7F81'
  },

  numberButtonText: {
    alignItems: 'flex-start',
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white'
  },

  resultButton: {    
    alignItems: 'flex-start',
    height: (screenHeight - 24) / 6,
    width: (screenWidth - 16) / 4,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3A331',
    
  },

  acButton: {
    alignItems: 'flex-start',
    height: (screenHeight - 24) / 6,
    width: (screenWidth - 16) / 4,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#646466'
  },

  freeSpace: {
    alignItems: 'flex-start',
    height: (screenHeight - 24) / 6,
    width: (screenWidth - 8) / 2,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#646466'
  },

  displayView: {
    alignItems: 'flex-start',
    height: (screenHeight - 24) / 6,
    width: screenWidth,
    backgroundColor: '#545557',
    justifyContent: 'center',
  },

  displayText: {
    alignItems: 'flex-start',
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 20,
  }
  
});
