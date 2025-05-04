import React from 'react';
import { useState } from "react";
import { Formik } from 'formik';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { AppContext } from '../AppContext';

const Login = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const { setStudentDetail } = React.useContext(AppContext);

  const mutation = useMutation(async (loginRequest) => {
    console.log(loginRequest);
    const response = await fetch('https://webportal.jiit.ac.in:6011/StudentPortalAPI/token/generate-token1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      // throw new Error('Network response was not ok');
      alert('Invalid information, please try again.');
    }

    setStudentDetail(data);
    return response.json();
  })

  const handleSubmit = async (loginFormData) => {
    const loginRequest = {
      otppwd: "PWD",
      username: loginFormData.enrollmentNumber,
      passwordotpvalue: loginFormData.password,
      Modulename: "STUDENTMODULE",
    }
    // try {
    //   await mutation.mutateAsync(loginRequest);
    //   // Only navigate to home if mutation is successful
    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.log(error);
    //   // Throw error if mutation is not successful
    //   throw new Error('Authorization failed');
    // }
    mutation.mutate(loginRequest)
    navigation.navigate('Home');
    // .then(()=>{
    //   navigation.navigate('Home');
    // })
    // .catch(()=>{
    //   alert('Invalid information, please try again.');
    // });
    // TODO: navigate only on success
    
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Login Screen</Text>
      <Text style={styles.description}>Login</Text>
      <Formik
        initialValues={{ enrollmentNumber: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your enrollment number</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={handleChange('enrollmentNumber')}
                onBlur={handleBlur('enrollmentNumber')}
                value={values.enrollmentNumber}
                keyboardType="default"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your password</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                autoCorrect={false}
                secureTextEntry={isSecure}
              />
              <TouchableOpacity
                style={styles.btnEye}
                onPress={() => {
                  setIsSecure(!isSecure);
                }}
              >
                <MaterialCommunityIcons
                  name={
                    isSecure == false
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={20}
                  color={'rgba(255,255,255,0.7'}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
            >
              <Text style={{ color: '#fff' }}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  mainHeader: {
    fontSize: 25,
    color: "#344055",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 15,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 20,
    color: "#7d7d7d",
    paddingBottom: 20,
    lineHeight: 25,
    fontFamily: "serif",
  },
  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  inputStyle: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#6E42E5",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 6,
    fontFamily: "serif",
    fontSize: 18,
  },
  // wrapper: {
  //   // paddingHorizontal: 10,
  //   // paddingVertical: 15,
  //   // paddingBottom: 30
  //   flexDirection: "row",
  //   // justifyContent:'center',
  //   alignItems: "center",
  //   marginTop: 15,
  //   marginBottom: 360,
  //   // alignContent:"center"
  // },
  // wrapperText: {
  //   // paddingLeft: 30
  //   marginTop: 0,
  // },
  buttonStyle: {
    borderRadius: 40,
    height: 50,
    width: 141,
    marginTop: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6E42E5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "600",
  },
  btnEye: {
    position: 'absolute',
    right: 15,
    top: 49,
  }
});

export default Login;
