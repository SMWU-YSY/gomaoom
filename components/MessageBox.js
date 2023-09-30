// src/OtherScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { color, commomStyle, images } from '../theme.js';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MessageBox = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
		const getData = async () => {
			const storageData = 
			  JSON.parse(await AsyncStorage.getItem("accessToken"));
			if(storageData) {
				setAccessToken(storageData);
			}
		}
		// AsyncStorage에 저장된 데이터가 있다면, 불러온다.
		getData();
	
		// 데이터 지우기
		// AsyncStorage.clear();
	}, []);

  useEffect(() => {
    const apiUrl = "http://3.34.212.92:8080/api/message/inbox"
    if(accessToken!==null){
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더 설정
        },
      }).then((response) => {
          // 성공적으로 응답 받았을 때 수행할 작업
          const responseData = response.data;
          if (responseData.data) {
            setMessages(responseData.data)
          }
        })
        .catch((error) => {
          // 오류 처리
			if (error.response && error.response.status === 401) {
				console.log("unauth");
				navigation.navigate('login');
			} else {
				console.error(error);
			}
        });
    }
    
  }, [accessToken]);

  const handleReceivedMessage = (letterId, messageId) => {
    navigation.navigate('ReceivedMessage',{letterId: letterId, messageId: messageId});
  };

  return (  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={images.inbox} style={commomStyle.backgroundImage}/>
      <View style={{ marginVertical: 60}}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {messages.map((message) => (
        <View style={styles.messageContainer}>
          <View key={message.letterId} style={styles.messageLeftContainer}>
            <Image
              source={require('gomaoom/assets/images/boy.png')}
              style={styles.image}
            />
          </View>

          <View key={message.letterId} style={styles.messageRightContainer}>
            <Text style={styles.messageText}>
              {`${message.senderNickname} 님이\n편지를 보냈습니다.`}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>handleReceivedMessage(message.letterId, message.messageId)}>
                <Text style={styles.buttonText}>편지 확인하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column', // 수평으로 배치하기 위해 flexDirection를 row로 설정
    padding: 10,
    backgroundColor: color.bg,
    // backgroundColor: "#FAF3EB",
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 0.6,
    backgroundColor: '#D2E0FB',
    padding: 10,
    paddingVertical: 18,
    borderRadius: 20,
    width: "100%",
    // borderWidth: 2,
    // borderBottomWidth: 2,
    borderColor:"#D2E0FB",
    borderStyle: 'solid',
    marginBottom: 15,
  },
  scrollViewContainer:{
    // backgroundColor:'green',
    alignItems: 'center',
    // marginTop:15,
    padding:10,
    //width: SCREEN_WIDTH-60,
		//height: SCREEN_HEIGHT-200,
  },
  messageLeftContainer: {
    flex: 1,
    marginRight:5,
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  messageRightContainer: {
    flex: 2,
    // backgroundColor: 'purple',
    justifyContent:'space-between',
    // flexDirection: 'column',
  },
  image: {
    // height: 100,
    // width:100,
    // width: "90%",
    // height: "100%",
    // marginLeft: "5%",
  },
  messageText:{
    // height: 20,
    fontSize: 18,
    color: '#3B628C',
    fontWeight:'bold',
    // backgroundColor: 'pink',
    paddingLeft: 10,
    // margin: 5,
    // textAlign: 'center',
  },
  buttonContainer:{
    //paddingTop: 20,
    // height: "30%",
    // marginBottom: 40,
    alignItems:'flex-end',
    
    // backgroundColor: "red",
  },
  buttonMargin: {
    marginHorizontal: 8, // Add horizontal margin between buttons
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#5E86B1',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius: 20, 
  },
});
