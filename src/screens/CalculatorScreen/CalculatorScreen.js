import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';

const CalculatorScreen = () => {
  const [num1, setNumber1] = useState(null);
  const [num2, setNumber2] = useState(null);

  const [result, setResult] = useState(null);

  const [button, setButton] = useState('Calculate');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Add', value: 'Add'},
    {label: 'Substract', value: 'Substract'},
    {label: 'Multiply', value: 'Multiply'},
  ]);

  DropDownPicker.setListMode('SCROLLVIEW');

  const calculation = async () => {
    try {
      console.log(num1, num2);

      setButton('Calculating...');

      setResult(null);

      if (value === 'Add') {
        const res = await axios.post(
          'https://calculator-api-five.vercel.app/api/add',
          {
            num1,
            num2,
          },
        );
        console.log(res.data);
        setResult(res.data.ans);
      }

      if (value === 'Substract') {
        const res = await axios.post(
          'https://calculator-api-five.vercel.app/api/substract',
          {
            num1,
            num2,
          },
        );
        console.log(res.data);
        setResult(res.data.ans);
      }

      if (value === 'Multiply') {
        const res = await axios.post(
          'https://calculator-api-five.vercel.app/api/multiply',
          {
            num1,
            num2,
          },
        );
        console.log(res.data);
        setResult(res.data.ans);
      }

      // if (value === 'Divide') {
      //   const res = await axios.post('https://calculator-api-five.vercel.app/api/divide', {
      //     num1,
      //     num2,
      //   });
      //   console.log(res.data);

      //   if(res.data.ans=null){
      //     setResult(res.data.ans);
      //   }

      // }

      setButton('Calculate');
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = () => {
    //regex to filter only number and dot

    const regex = /^[0-9.]*$/;

    setResult(null);

    if (regex.test(num1) && regex.test(num2)) {
      if (!num1 || !num2) {
        return alert('Field should not be empty');
      }

      if (!value) {
        alert('Please select operation type');
      } else {
        calculation();
      }
    } else {
      alert('Please enter only number');
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Text style={styles.textHeader}>Calculator</Text>
            </View>

            <View>
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={num => setNumber1(num)}
                  defaultValue={num1}
                  placeholderTextColor="#000"
                  placeholder="Enter Number 1"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={num => setNumber2(num)}
                  defaultValue={num2}
                  placeholderTextColor="#000"
                  placeholder="Enter Number 2"
                />

                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput()}>
                  <Text style={{color: 'white'}}>{button}</Text>
                </TouchableOpacity>
              </SafeAreaView>

              {result ? (
                <View>
                  <Text style={styles.text}>
                    Ans = <Text>{result}</Text>
                  </Text>
                </View>
              ) : result == 0 ? (
                <View>
                  <Text style={styles.text}>Ans = 0 </Text>
                </View>
              ) : null}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    marginBottom:30
  },
  input: {
    height: 60,
    width: 325,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    color: 'black',
  },
  button: {
    backgroundColor: '#2645BD',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 20,
    fontWeight: '500',
  },

  textHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    margin: 20,
    fontWeight: '500',
  },
  contentContainer:{
    flexGrow:1,
    backgroundColor:'white'
  }
});
