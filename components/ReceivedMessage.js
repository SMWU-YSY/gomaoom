import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from "react-native";
import BalloonBox from '../components/BalloonBox';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { color, commomStyle, images } from '../theme.js';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Winfo from "./write/Winfo";
import Wtitle from "./write/Wtitle";
import Wtext from "./write/Wtext";
import { StatusBar } from "expo-status-bar";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReceivedMessage = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('picture');
    const [selectHeight, setSelectedHeight] = useState(0.4);
    const [contentToSave, setContentToSave] = useState('');
    
    const route = useRoute();
    const letterId = route.params.letterId;
    const messageId = route.params.messageId;
    const characterUrl = route.params.characterUrl;
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const [message, setMessage] = useState([]);
	const [date, setDate] = useState('');

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
		//AsyncStorage.clear();
	}, []);

    useEffect(() => {
        const apiUrl = `http://3.34.212.92:8080/api/message/${messageId}`
        const authToken = `Bearer ${accessToken}`;
        //const authToken = "Bearer eyJyZWdEYXRlIjoxNjk1ODA4NTk2NTc4LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJoZWxsbzEyIiwiaWF0IjoxNjk1ODA4NTk2LCJleHAiOjE2OTU4MzczOTZ9.B_oJ0g2ADJO36l912Pj0pkx_LZqb0AqtByNVhklAV2Q ";
        if(accessToken!=null){
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
						setDate(responseData.data[0].sendAt)
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
						console.log("unauth");
						navigation.navigate('login');
					} else {
						console.error(error);
					}
                })
                .finally(() => {
                    // 비동기 작업 완료 후 로딩 상태 변경
                    setIsLoading(false);
                });
        }
        
    }, [messageId, accessToken]);

    const balloonRef = useRef(null);
    const pictureRef = useRef(null);
    const allRef = useRef(null);
    const letterRef = useRef(null);

    const handleButtonPress = (buttonType) => {
        if(buttonType==='picture'){
            setSelectedHeight(0.4);
        }else if (buttonType==='all'){
            setSelectedHeight(0.7);
        }else if(buttonType==='letter'){
            setSelectedHeight(0.5);
        }
        setSelectedButton(buttonType);
    };
    const handleSaveButtonPress = async () => {
        console.log('저장하기 버튼 눌림')
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
        // console.log("로딩완료")
        // console.log("메시지", message)
        return (
            <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
        <StatusBar style="auto" />

            {/* 첫번째 맨 위 사진 왼쪽, 말풍선 오른쪽 배치 */}
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: characterUrl }}
                        style={styles.imageContainer}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.balloonContainer}>
                    <BalloonBox content={message[0].extra} />
                </View>
            </View>

            {/* 그림, 모두, 편지 버튼 */}
            <View style={{height:SCREEN_HEIGHT*selectHeight,...styles.backContainer}}>
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

            
            {selectedButton === 'picture' && (
                // <ScrollView ref={pictureRef} contentContainerStyle={styles.contentContainer}>
                    <View ref={pictureRef} style={styles.letterContainer}>
                        <View style={{height:SCREEN_HEIGHT*0.3,...styles.letter}}>
                            <Winfo dateValue={date.split('T')[0]} weatherValue={message[0].letterWeather} setWeatherValue={null} editable={false}/>
                            <Wtitle titleValue={message[0].letterTitle} setTitleValue={null} editable={false}/>
                            <View style={styles.letterPic}>
                                <View style={styles.imgContainer}>
                                    <Image source={{ uri: message[0].letterImage }} style={styles.image} resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                    </View>
            )}
            {selectedButton === 'all' && (
                <View ref={allRef} style={styles.letterContainer}>
                    <View style={{height:SCREEN_HEIGHT*0.6,...styles.letter}}>
                        <Winfo dateValue={date.split('T')[0]} weatherValue={message[0].letterWeather} setWeatherValue={null} editable={false}/>
                        <Wtitle titleValue={message[0].letterTitle} setTitleValue={null} editable={false}/>
                        <View style={{borderBottomWidth: 1,borderBottomColor: "black",...styles.letterPic}}>
                            <View style={styles.imgContainer}>
                                <Image source={{ uri: message[0].letterImage }} style={styles.image} resizeMode='contain' />
                            </View>
                    </View>
                    <Wtext isLast={true} textValue={message[0].letterText} setTextValue={null} editable={false}/>
                    </View>
                </View>
            )}
            {selectedButton === 'letter' && (
                <View ref={letterRef} style={styles.letterContainer}>
                    <View style={{height:SCREEN_HEIGHT*0.4,...styles.letter}}>
                        <Winfo dateValue={date.split('T')[0]} weatherValue={message[0].letterWeather} setWeatherValue={null} editable={false}/>
                        <Wtitle titleValue={message[0].letterTitle} setTitleValue={null} editable={false}/>
                        <Wtext isLast={true} textValue={message[0].letterText} setTextValue={null} editable={false}/>
                    </View>
                </View>
            )}
        </View>

            {/* 저장하기 버튼 */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveButtonPress}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </ScrollView>

      );
};

const styles = StyleSheet.create({
    container: {
        marginTop:40,    
        flex: 1,
        backgroundColor: color.bg,
        zIndex:1,
        showsHorizontalScrollIndicator: false,
    },
    letterContainer:{
        alignItems:'center',
        height:SCREEN_HEIGHT*0.65,
    },
    letter: {
		backgroundColor: "white",
        // flex:1,
		width: SCREEN_WIDTH*0.85,
		// height: SCREEN_HEIGHT*0.55,
		borderRadius: 15,
		borderWidth: 1,
		position: 'relative',
		marginTop: 60
	},
    topContainer: {
        // backgroundColor:'pink',
      flexDirection: 'row',
    //   justifyContent:'center',
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    backContainer:{
        backgroundColor:'#E8EDF4',
        marginHorizontal: 15,
        marginTop:15,
        borderRadius: 15,
        zIndex:10,

        // height:"auto",
		// borderWidth: 1,
    },
    letterPic: {
		flex: 3.5,
		// borderBottomWidth: 1,
		// borderBottomColor: "black",
		alignItems: "center",
		justifyContent: "center"
	},
	imgContainer: {
		width: "100%",
		height: "100%",
		position: 'relative',
	},
	image: {
		// flex: 6,
		width: "100%",
		height: "100%",
	},
    imageContainer: {
      width: 100, // 사진의 가로 크기
      height: 100, // 사진의 세로 크기
      borderRadius: 50, // 사진이 원 모양이 되도록
      backgroundColor: '#ccc', // 이미지 없을 시 배경색
    },
    contentContainer: {
        marginTop:60,
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
        justifyContent: 'center',
        marginTop: 10,
        marginBottom:-50,
        zIndex:50,

    },
    button: {
        backgroundColor: '#E8F1F9',
        paddingHorizontal: 16,
        paddingVertical: 8,        
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#5E86B1',
        margin:3,
        zIndex:100,
    },
    buttonPressed: {
        backgroundColor: '#5E86B1', // 눌렸을 때 초록색으로 변경
    },
    buttonText: {
        color: '#3B628C',
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
        zIndex:60,
    },
    saveButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
  });
  
export default ReceivedMessage;