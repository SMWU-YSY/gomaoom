import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import BalloonBox from '../components/BalloonBox';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { color, commomStyle, images } from '../theme.js';

const ReceivedMessage = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('picture');

    const [contentToSave, setContentToSave] = useState('');

    const balloonRef = useRef(null);
    const pictureRef = useRef(null);
    const allRef = useRef(null);
    const letterRef = useRef(null);

    const handleButtonPress = (buttonType) => {
        setSelectedButton(buttonType);
    };

    const handleSaveButtonPress = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
            alert('Please grant permission to access the media library.');
            return;
        }

        let contentToSaveRef;
        switch (selectedButton) {
            case 'picture':
                contentToSaveRef = pictureRef;
                break;
            case 'all':
                contentToSaveRef = allRef;
                break;
            case 'letter':
                contentToSaveRef = letterRef;
                break;
            default:
                contentToSaveRef = balloonRef;
                break;
        }
    
        if (contentToSaveRef && contentToSaveRef.current) {
          const uri = await takeScreenshot(contentToSaveRef.current);
          if (uri) {
            saveToMediaLibrary(uri);
          }
        }
    };
    
    const takeScreenshot = async (viewRef) => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });
            return uri;
          } catch (error) {
                console.error(error);
            return null;
          }
    };

    const saveToMediaLibrary = async (uri) => {
    try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
        alert('이미지가 저장되었습니다.');
    } catch (error) {
        console.error(error);
        alert('이미지 저장에 실패했습니다.');
    }
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

            {/* 바뀔 View */}
            {selectedButton === 'picture' && (
                <ScrollView ref={pictureRef} contentContainerStyle={styles.contentContainer}>
                    <Text>그림 버튼 눌렀을 때 사진 왜 안보일까</Text>
                    <Image
                        source={require('gomaoom/assets/images/dailydiary.png')}
                        style={styles.image}
                    />
                </ScrollView>
            )}
            {selectedButton === 'all' && (
                <ScrollView ref={allRef} contentContainerStyle={styles.contentContainer}>
                    <Text>모두 버튼을 누를 때 바뀌는 내용이다.</Text>
                </ScrollView>
            )}
            {selectedButton === 'letter' && (
                <ScrollView ref={letterRef} contentContainerStyle={styles.contentContainer}>
                <Text>편지 버튼을 누를 때 바뀌는 내용이다.</Text>
                </ScrollView>
            )}

            {/* 저장하기 버튼 */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveButtonPress}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor: color.bg,
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        height: 150, // 크기 조절
    },
    saveButton: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginVertical: 10,
    },
    saveButtonText: {
      color: '#333',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  
export default ReceivedMessage;