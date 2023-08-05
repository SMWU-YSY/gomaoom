// src/OtherScreen.js
import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MessageBox = ({ }) => {

  const navigation = useNavigation();

  const handleReceivedMessage = () => {
    console.log('편지확인하러 이동');
    navigation.navigate('ReceivedMessage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.messageLeftContainer}>
          <Image
              source={require('gomaoom/assets/images/boy.png')}
              style={styles.image}
          />
        </View>
        <View style={styles.messageRightContainer}>
          <Text style={styles.messageText}>우리 손자님이 편지를 보냈습니다.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => alert('해당 알림 사라지게')} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>다음에 읽기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReceivedMessage} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>편지 확인하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        
      </View>
      <View style={styles.messageContainer}>
      <View style={styles.messageLeftContainer}>
          <Image
              source={require('gomaoom/assets/images/boy.png')}
              style={styles.image}
          />
        </View>
        <View style={styles.messageRightContainer}>
          <Text style={styles.messageText}>우리 손자님이 편지를 보냈습니다.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => alert('해당 알림 사라지게')} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>다음에 읽기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('편지확인하러 이동')} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>편지 확인하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
      <View style={styles.messageContainer}>
      <View style={styles.messageLeftContainer}>
          <Image
              source={require('gomaoom/assets/images/boy.png')}
              style={styles.image}
          />
        </View>
        <View style={styles.messageRightContainer}>
          <Text style={styles.messageText}>우리 손자님이 편지를 보냈습니다.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => alert('해당 알림 사라지게')} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>다음에 읽기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('편지확인하러 이동')} style={styles.buttonMargin}>
              <Text style={styles.buttonText}>편지 확인하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // 수평으로 배치하기 위해 flexDirection를 row로 설정
    justifyContent: 'space-between', // 뷰들을 평행하게 배치하기 위해 간격을 벌려줌
    alignItems: 'center', // 뷰들을 수직 중앙에 배치
    padding: 20,
    backgroundColor: '#f0f0f0',
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
    flex: 0.68,
    width: 100,
    height: 100,
    marginBottom: 10,
    padding: 10,
  },
  messageText:{
    fontSize: 15,
    color: 'black',
    backgroundColor: '#ffffff',
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 20,
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
