import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import BalloonBox from '../components/BalloonBox';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { color, commomStyle, images } from '../theme.js';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReceivedMessage = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('picture');
    const [contentToSave, setContentToSave] = useState('');
    
    const route = useRoute();
    const letterId = route.params.letterId;
    const messageId = route.params.messageId;
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const [message, setMessage] = useState([]);

    const [accessToken, setAccessToken] = useState('');
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
        const apiUrl = `http://3.34.212.92:8080/api/message/${messageId}`
        const authToken = `Bearer ${accessToken}`;
        //const authToken = "Bearer eyJyZWdEYXRlIjoxNjk1ODA4NTk2NTc4LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJoZWxsbzEyIiwiaWF0IjoxNjk1ODA4NTk2LCJleHAiOjE2OTU4MzczOTZ9.B_oJ0g2ADJO36l912Pj0pkx_LZqb0AqtByNVhklAV2Q ";

        axios.get(apiUrl, {
            headers: {
                Authorization: authToken, // Authorization 헤더 설정
            },
            })
            .then((response) => {
                // 성공적으로 응답 받았을 때 수행할 작업
                const responseData = response.data;
                if (responseData.data) {
                    setMessage(responseData.data)
                    console.log(responseData.data)
                    console.log(responseData.data[0].letterDate)
                }
            })
            .catch((error) => {
                // 오류 처리
                console.error('오류:', error);
            })
            .finally(() => {
                // 비동기 작업 완료 후 로딩 상태 변경
                setIsLoading(false);
            });
    }, [messageId, accessToken]);

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

    // 로딩 상태가 true일 때 로딩 메시지 표시
    if (isLoading | message.length == 0) {
        console.log("로딩완료")
        console.log("메시지", message)
        return (
            <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* 첫번째 맨 위 사진 왼쪽, 말풍선 오른쪽 배치 */}
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('gomaoom/assets/images/boy.png')}
                        style={styles.imageContainer}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.balloonContainer}>
                    <BalloonBox content={message[0].extra} />
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
                    <View style={styles.header}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>
                                {message[0].letterDate.slice(0,4)}년 {message[0].letterDate.slice(5,7)}월 {message[0].letterDate.slice(8,10)}일
                            </Text>
                        </View>
                        <View style={styles.weatherContainer}>
                            <Text style={styles.weather}>{message[0].letterWeather}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>제목:{message[0].letterTitle}</Text>
                    <Image
                        source={{ uri: message[0].letterImage }}
                        style={styles.image}
                    />
                </ScrollView>
            )}
            {selectedButton === 'all' && (
                <ScrollView ref={allRef} contentContainerStyle={styles.contentContainer}>
                    <Text>{message[0].letterText}</Text>
                    <Image
                        source={{ uri: message[0].letterImage }}
                        style={styles.image}
                    />
                </ScrollView>
            )}
            {selectedButton === 'letter' && (
                <ScrollView ref={letterRef} contentContainerStyle={styles.contentContainer}>
                    <Text>{message[0].letterText}</Text>
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
    contentContainer: {
        margin:20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'skyblue',
        height: 500, // 크기 조절
    },
    header:{
        flexDirection: 'row', // 가로로 배치
        alignItems: 'center', // 수직 정렬을 가운데로
        justifyContent: 'space-between', // 좌우 정렬 간격을 최대로
        paddingHorizontal: 16, // 가로 여백
        paddingVertical: 8, // 세로 여백
        backgroundColor: '#eee', // 배경색
    },
    dateContainer: {
        flex: 2, // 동적으로 크기 조절
    },
    date:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    weather:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    weatherContainer: {
        flex: 1, // 동적으로 크기 조절
        alignItems: 'flex-end', // 우측 정렬
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 20,
        padding:10,
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 16,
        color: '#9AA7DD',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    image: {
        flex: 1,
        resizeMode:'contain',
        //backgroundColor: 'yellow',
        //marginTop: 0,
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
      paddingBottom: 20,
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