// src/OtherScreen.js
import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { color, commomStyle, images } from '../theme.js';

const SentMessage = ({ navigation,route }) => {
  
  const onClickSendMessage = () => {
    console.log('편지확인하러 이동');
    navigation.navigate('sendList');
  };

  const onClickHome = () => {
    navigation.navigate('홈');
  }

  return (
    <View style={styles.container}>
        <Image
            source={require('gomaoom/assets/icons/message.webp')}
            style={styles.image}
        />
        <Text style={styles.textContainer}>
          {route.params.recipientList} 님께 편지가 전송되었습니다. 
        </Text>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity onPress={onClickSendMessage} style={styles.buttonMargin}>
          <Text style={styles.buttonText}>편지 보러가기</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onClickHome} style={styles.buttonMargin}>
          <Text style={styles.buttonText}>홈으로 이동</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SentMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // 수평으로 배치하기 위해 flexDirection를 row로 설정
    justifyContent: 'space-between', // 뷰들을 평행하게 배치하기 위해 간격을 벌려줌
    alignItems: 'center', // 뷰들을 수직 중앙에 배치
    padding: 20,
    backgroundColor: color.bg,
  },
  messageContainer: {
    flex: 0.6,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: "100%",
    marginVertical: "5%", 
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textContainer: {
    fontSize: 20,
    color: '#9AA7DD',
  },
  navigatonContainer:{
    alignItems: 'center', 
    justifyContent: 'center',
    height: "10%",
  },
  messageLeftContainer: {
    flex: 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  messageRightContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop:200,
    width: 100,
    height: 100,
    marginBottom: 10,
    padding: 10,
  },
  messageText:{
    fontSize: 15,
    color: '#9AA7DD',
    backgroundColor: '#ffffff',
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer:{
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    height: "30%",
    marginBottom: 20,
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
