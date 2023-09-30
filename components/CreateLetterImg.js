// https://docs.expo.dev/versions/latest/sdk/async-storage/
// https://icons.expo.fyi/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Keyboard, View, 
		Platform, TouchableWithoutFeedback, Image,
		Dimensions, Pressable, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { color, commomStyle, images } from '../theme';
import axios from 'axios';

import Winfo from './write/Winfo';
import Wtitle from './write/Wtitle';
import Wtext from './write/Wtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CreateLetterImg({ navigation, route }) {
	const letterData = route.params.letterData;
	const GENERATE_TYPE = "dalle";

	const [recreateImgResponse, setRecreateImgResponse] = useState(letterData);
	// const [imgUrl, setImgUrl] = useState(`${letterData.limgUrl}`);
	const [loading, setLoading] = useState(false);
	const [cnt, setCnt] = useState(2);

	const [accessToken,setAccessToken]=useState('');
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

	const recreateImg = async () => {
		setLoading(true);

		try {
			const response = await axios.get('http://3.34.212.92:8080/api/letter/write', {
			  params: {
				letterId: `${letterData.lid}`,
				generateType: `${GENERATE_TYPE}`
			  },
			  headers: {
				'Authorization': `Bearer ${accessToken}`
			  }
			});
		
			setRecreateImgResponse(response.data.data[0]);
			// setImgUrl(response.data.data[0].limgUrl);
			setCnt(cnt - 1);
			// console.log(response.data.data[0]);

		} catch (error) {
			if (error.response && error.response.status === 401) {
			  console.log("unauth");
			  navigation.navigate('login');
			} else {
			  console.error(error);
			}
		} finally {
			setLoading(false);
		}
	};

	const onPress = async() => {
		// console.log(recreateImgResponse);
		navigation.navigate('send', {letterData : recreateImgResponse});
		await AsyncStorage.setItem("isNew", JSON.stringify(false));

	};
  
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
			<View style={styles.letter}>
				<Winfo weatherValue={letterData.lweather} setWeatherValue={null} editable={false}/>
				<Wtitle titleValue={letterData.ltitle} setTitleValue={null} editable={false}/>

				<View style={styles.letterPic}>
					{loading ? (
						<ActivityIndicator size="large" color={color.b2} />
					) : (
						<View style={styles.imgContainer}>
							<Image source={{ uri: recreateImgResponse.limgUrl }} style={styles.image} resizeMode='contain' />
							{cnt > 0 && (
								<TouchableOpacity style={styles.reloadBtn} onPress={recreateImg}>
								<Ionicons name="reload" size={20} color="white" />
								<Text style={{color:"white", paddingLeft: 6, fontSize: 15}}>{cnt}</Text>
								</TouchableOpacity>
							)}
						</View>
					)}
				</View>

				<Wtext textValue={letterData.ltext} setTextValue={null} editable={false}/>
				
				<View style={styles.letterBtn}>
					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
						<Pressable
							style={[styles.button, styles.buttonY]}
							>
							<Text style={styles.textStyle} onPress={onPress}>전송하기</Text>
						</Pressable>
					</View>
				</View>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.bg,
		// paddingHorizontal: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	letter: {
		backgroundColor: "white",
		width: SCREEN_WIDTH-60,
		height: SCREEN_HEIGHT-200,
		borderRadius: 15,
		borderWidth: 1,
		position: 'relative',
		marginTop: 60
	},
	letterPic: {
		flex: 3.5,
		borderBottomWidth: 1,
		borderBottomColor: "black",
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
	reloadBtn: {
		position: 'absolute',
		top: 10,
		right: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: "black",
		borderRadius: 15,
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	letterBtn: {
		flex: 1.5,
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonN: {
		backgroundColor: color.b2,
		marginHorizontal: 15,
	},
	buttonY: {
		backgroundColor: color.b2,
		margin: 10,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
