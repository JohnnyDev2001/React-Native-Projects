import React, { useState, useEffect }from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard
} from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x:0, y: 80}))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}))
  
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();

  },[]);
    
  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>

      <Animated.View
      style={
        [styles.container,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y}
          ]
        }
        ]}>
        <TextInput
        style={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TouchableOpacity
        style={styles.subimitBtn}
        >
          <Text
          style={styles.textBtn}
          >Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.registerBtn}>
          <Text
          style={styles.registerText}
          >Criar Conta Gratuita</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  containerLogo:{
    flex:1,
    justifyContent: 'center',
  },
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  input:{
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  subimitBtn:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textBtn:{
    color: '#fff',
    fontSize: 17,
  },
  registerBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText:{
    color: '#fff',
    fontSize: 14,
  }
});