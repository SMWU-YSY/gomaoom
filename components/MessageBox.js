// src/OtherScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { color, commomStyle, images } from '../theme.js';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MessageBox = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const getData = async () => {
	const storageData = 
	  	JSON.parse(await AsyncStorage.getItem("accessToken"));
		if(storageData) {
			setAccessToken(storageData);
		}
	}

  	useEffect(() => {
		getData();
	}, []);

	const apiUrl = "http://3.34.212.92:8080/api/message/inbox"
	const getMessageBox = () => {
		axios.get(apiUrl, {
			headers: {
			Authorization: `Bearer ${accessToken}`, // Authorization 헤더 설정
			},
		}).then((response) => {
			// 성공적으로 응답 받았을 때 수행할 작업
			const responseData = response.data;
			if (responseData.data) {
				setMessages(responseData.data)
				console.log(responseData.data)
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

  useEffect(() => {
    
    if(accessToken!==null){
      getMessageBox();
    }
    
  }, [accessToken]);

  useFocusEffect(
	React.useCallback(() => {
		console.log("받은 보관함")
		getData();
		if(accessToken!=null){
			getMessageBox();
		}
	}, [])
);

  const handleReceivedMessage = (letterId, messageId, characterUrl) => {
    navigation.navigate('ReceivedMessage',{letterId: letterId, messageId: messageId, characterUrl: characterUrl});
  };

  return (  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={images.blueTop} style={commomStyle.backgroundImage}/>
      <View style={{marginTop:60,}}>
        <Text style={{fontSize:30, fontWeight:'bold',textAlign:'center'}}>수신보관함</Text>
      </View>
      <View style={{ marginVertical: 20 }}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {messages.length === 0 && <Text>수신된 편지가 없습니다.</Text>}
      {messages.map((message) => (
        <View key={message.messageId} style={styles.messageContainer}>
          <View style={styles.messageLeftContainer}>
              <Image
                  source={{ uri: message.characterUrl }}
                  resizeMode="contain"
                  style={styles.imageContainer}
              />  
          </View>

          <View style={styles.messageRightContainer}>
            <Text style={styles.messageText}>
              {`${message.senderNickname} 님이\n편지를 보냈습니다.`}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>handleReceivedMessage(message.letterId, message.messageId, message.characterUrl)}>
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
    padding: 10,
    backgroundColor: color.bg,
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 0.6,
    backgroundColor: '#E8EDF4',
    padding: 10,
    paddingVertical: 18,
    borderRadius: 20,
    width: "100%",
    borderColor:"#E8F1F9",
    borderStyle: 'solid',
    marginBottom: 10,
  },
  scrollViewContainer:{
    alignItems: 'center',
    padding:10,
  },
  messageLeftContainer: {
    flex: 1,
    marginRight:5,
    alignItems: 'center',
  },
  messageRightContainer: {
    flex: 2,
    justifyContent:'space-between',
  },
  imageContainer: {
    width: 100, // 사진의 가로 크기
    height: 100, // 사진의 세로 크기
    borderRadius: 50, // 사진이 원 모양이 되도록
    backgroundColor: '#ccc', // 이미지 없을 시 배경색
  },
  messageText:{
    fontSize: 18,
    color: '#5E86B1',
    fontWeight:'bold',
    paddingLeft: 10,
  },
  buttonContainer:{
    alignItems:'flex-end',
  },
  buttonMargin: {
    marginHorizontal: 8, // Add horizontal margin between buttons
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#8EACCD',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius: 20, 
  },
});

/** 
안녕하세요 할아버지! 어떻게 지내시나요?
저는 요즘 학교를 다니면서 시험 준비를 하고 있어요ㅠㅠ
다음 주면 추석이네요. 빨리 할아버지 집에 놀러가고 싶어요~~
그때까지 건강하게 계세요. 사랑해요~~~
*/