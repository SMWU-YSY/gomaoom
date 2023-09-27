// src/OtherScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { color, commomStyle, images } from '../theme.js';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MessageBox = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const apiUrl = "http://3.34.212.92:8080/api/message/outbox"
    const authToken = 'Bearer eyJyZWdEYXRlIjoxNjk1NzExNDY1MzE1LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiLrrLTri4giLCJpYXQiOjE2OTU3MTE0NjUsImV4cCI6MTY5NTc0MDI2NX0.uIIN1aosCZZuTlC3aQCfbfYMEhvtYMzt8gchtsvm78k'; //test용
    
    axios.get(apiUrl, {
      headers: {
        Authorization: authToken, // Authorization 헤더 설정
      },
    })
      .then((response) => {
        // 성공적으로 응답 받았을 때 수행할 작업
        const responseData = response.data;
        if (responseData.data) {
          setMessages(responseData.data)
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error('오류:', error);
      });
  }, []);

  const handleReceivedMessage = (letterId, messageId) => {
    console.log('message.letterId',letterId)
    console.log('message.messageId',messageId)
    navigation.navigate('ReceivedMessage',{letterId: letterId, messageId: messageId});
  };

  return (  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={images.blueTop} style={commomStyle.backgroundImage}/>
      <View style={{ paddingTop: 150 }}></View>
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
              {`${message.senderNickname} 님이 편지를 보냈습니다.`}
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
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 0.6,
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: "100%",
    marginVertical: "5%", 
    marginHorizontal: "5%",
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollViewContainer:{
    //width: SCREEN_WIDTH-60,
		//height: SCREEN_HEIGHT-200,
  },
  messageLeftContainer: {
    flex: 1,
    marginRight: 10,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
  },
  messageRightContainer: {
    flex: 2,
    //backgroundColor: 'purple',
    flexDirection: 'column',
  },
  image: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
  },
  messageText:{
    height: 20,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f0f0f0',
    padding: 5,
    margin: 5,
    textAlign: 'center',
  },
  buttonContainer:{
    //paddingTop: 20,
    height: "30%",
    marginBottom: 40,
    //backgroundColor: "red",
  },
  buttonMargin: {
    marginHorizontal: 8, // Add horizontal margin between buttons
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    backgroundColor: '#CEE6F3',
    padding: 8,
    borderRadius: 20, 
  },
});
