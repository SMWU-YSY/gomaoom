import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import BalloonBox from '../components/BalloonBox';

const ReceivedMessage = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('picture');

    const handleButtonPress = (buttonType) => {
        setSelectedButton(buttonType);
    };

    return (
        <View style={styles.container}>
            {/* 첫번째 맨 위 사진 왼쪽, 말풍선 오른쪽 배치 */}
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('gomaoom/assets/images/boy.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.balloonContainer}>
                    <BalloonBox content="안녕하세요! 말풍선 모양의 네모박스 예시입니다." />
                </View>
            </View>

            {/* 그림, 모두, 편지 버튼 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'picture' && styles.buttonPressed,
                    ]}
                    onPress={() => handleButtonPress('picture')}
                    >
                    <Text style={styles.buttonText}>그림</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'all' && styles.buttonPressed,
                    ]}
                    onPress={() => handleButtonPress('all')}
                    >
                    <Text style={styles.buttonText}>모두</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'letter' && styles.buttonPressed,
                    ]}
                    onPress={() => handleButtonPress('letter')}
                    >
                    <Text style={styles.buttonText}>편지</Text>
                </TouchableOpacity>
            </View>

            {/* 두번째 사진 */}
            <View style={styles.bottomImageContainer}>
                <Image
                source={require('gomaoom/assets/images/dailydiary.png')}
                style={styles.image}
                resizeMode="contain"
                />
            </View>

            {/* 저장하기 버튼 */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    imageContainer: {
      width: 100, // 사진의 가로 크기
      height: 100, // 사진의 세로 크기
      borderRadius: 50, // 사진이 원 모양이 되도록
      backgroundColor: '#ccc', // 이미지 없을 시 배경색
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    balloonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    button: {
        backgroundColor: '#CCE0CC',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#006400',
      },
    buttonPressed: {
        backgroundColor: 'green', // 눌렸을 때 초록색으로 변경
    },
    buttonText: {
      color: '#006400',
      fontSize: 16,
    },
    bottomImageContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    saveButton: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginVertical: 20,
    },
    saveButtonText: {
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default ReceivedMessage;