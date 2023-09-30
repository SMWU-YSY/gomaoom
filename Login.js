import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [inputs,setInputs]=useState({
    id:'',
    password:'',
  });  
  const {id,password}=inputs;
  let accessToken='';

	const onChange=(keyvalue,e)=>{
		const {text}=e.nativeEvent
		setInputs({
		...inputs,
		[keyvalue]:text
		});
	};

	const onLoginClick=async()=>{
		try {
			const response = await axios.post("http://3.34.212.92:8080/api/user/login", 
			{	
				loginId: id,
				password:password,
			}
			, 
			{
				headers: {
				Accept: 'application/json',
				"Content-Type": "application/json",
				}
			});

			accessToken=response.headers.getAuthorization().split(" ");
			await AsyncStorage.setItem("accessToken", JSON.stringify(accessToken[1]));
			await AsyncStorage.setItem("userNick", JSON.stringify(response.data.data[0].unickname));
      await AsyncStorage.setItem("characterUrl", JSON.stringify(response.data.data[0].characterUrl));
			navigation.navigate('isLogin');
		} catch (error) {
			if (error.response && error.response.status === 404){
				Alert.alert(
					"아이디 확인",
					"존재하지 않은 아이디입니다.",
					[
						{ text: "확인" }
					]
				);
			}
			else if (error.response && error.response.status === 400){
				Alert.alert(
					"비밀번호 확인",
					"잘못된 비밀번호입니다.",
					[
						{ text: "확인" }
					]
				);
			}
			else{
				console.log(error.response.data);
			}
		} 
	};

	const gotoRegister=()=>{
		navigation.navigate('signup');
	};

  return (
      <View style={styles.background}>
      <Image source={require('gomaoom/assets/blueTop.png')}/>
      
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={{textAlign:'center'}}>
            Welcome
          </Text>
          <Text style={styles.mainTitle}>
            고마움
          </Text>
        </View>
        
        <View style={styles.loginContainer}>
          <View style={styles.loginInputContainer}>
            <TextInput 
              placeholder='아이디' 
              style={styles.inputText}
              value={id}
              onChange={(e)=>{onChange("id",e)}}
              />
            
          </View>
          <View style={styles.loginInputContainer}>
            <TextInput 
              placeholder='비밀번호' 
              style={styles.inputText}
              value={password}
              onChange={(e)=>{onChange("password",e)}}
              />
          </View>
          <TouchableOpacity onPress={onLoginClick}>
            <View style={{marginBottom:20,...styles.loginBtn}}>
                <Text style={{
                    fontSize:30,
                    textAlign:'center'
                }}>
                  로그인
                </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
        <TouchableOpacity onPress={gotoRegister}>
          <Text>
            아직 회원이 아니신가요?
          </Text>
            <Text style={{
                fontSize:30,
                textAlign:'center',
                color:'green'
            }}>
                가입하기
            </Text>
        </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <Image  source={require('gomaoom/assets/greenBottom.png')}/>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  background:{
      backgroundColor: '#FFFCF8',
      flex:1,
  },
  titleBox:{
    flex:1,
    // justifycontent: 'center',
    // backgroundColor:'red'
  },
  mainTitle:{
    // marginBottom:70,
    fontSize:40,
    
    fontWeight:'bold',
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  desc:{
      fontSize:25,
      marginTop:30,
      marginHorizontal:30,
  },
  loginContainer:{
    flex:3,
    alignItems:'center',
    // backgroundColor:'yellow',
    // justifyContent: 'center'
  },
  btnContainer:{
      // flexDirection:'column',
      justifyContent:'center',
      marginBottom:50,
      // backgroundColor:'pink',
  },
  loginBtn:{
      width:200,
      backgroundColor:'#F1F1F1',
      paddingHorizontal:30,
      paddingVertical:7,
      borderRadius:20,
      marginTop:20,
  },
  loginInputContainer:{
    // backgroundColor:'#F1F1F1',
    borderBottomWidth:1,
    borderColor:'grey',
    paddingHorizontal:10,
    paddingVertical:7,
    borderRadius:30,
    width:'70%',
    marginBottom:15,
  },
  inputText:{
    fontSize:25,
    width:270,
    paddingLeft:10,
    // textAlign:'center',
  },
});
