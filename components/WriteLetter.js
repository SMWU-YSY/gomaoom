// https://docs.expo.dev/versions/latest/sdk/async-storage/
// https://icons.expo.fyi/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Keyboard, View, 
		Platform, TouchableWithoutFeedback, Image,
		Dimensions, Pressable, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color, commomStyle, images } from '../theme';
import axios from 'axios';

import Winfo from './write/Winfo';
import Wtitle from './write/Wtitle';
import Wtext from './write/Wtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WriteLetter({ navigation, route }) {
	
	// const JWT_TOKEN = "eyJyZWdEYXRlIjoxNjk1NzM2MTY5OTIyLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiLjhLHjhLEiLCJpYXQiOjE2OTU3MzYxNjksImV4cCI6MTY5NTc2NDk2OX0.ScJvDN72a7_wqiI-SpyBst12F20XyPenAmJXtWYzDS0";
	const GENERATE_TYPE = "dalle";
	const [isNew,setIsNew]=useState(true);
	const [weatherValue, setWeatherValue] = useState('');
	const [titleValue, setTitleValue] = useState('');
	const [textValue, setTextValue] = useState('');
	const [loading, setLoading] = useState(false);

	const [accessToken,setAccessToken]=useState('');
	useEffect(()=>{
		// setIsNew(route.params.isNew);
		// console.log(route.params.isNew);
		setIsNew(true);
	},[isNew]);
	useEffect(() => {
		const getData = async () => {
			const storageData = JSON.parse(await AsyncStorage.getItem("accessToken"));
			// setIsNew(JSON.parse(await AsyncStorage.getItem("isNew")));
			if(storageData) {
				setAccessToken(storageData);
			}
		}
		// AsyncStorage에 저장된 데이터가 있다면, 불러온다.
		getData();
		//console.log('뭐여');
		// 데이터 지우기
		// AsyncStorage.clear();
	}, []);

	const saveLetter = async () => {
		// console.log(accessToken);
		setLoading(true);
		// 편지 저장
		axios.post('http://3.34.212.92:8080/api/letter/write', {
			weather: weatherValue,
			title: titleValue,
			text: textValue,
		}, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
		// 편지 그림 생성
		.then(response1 => {
			// console.log(response1.data.data[0]);
			const lid = response1.data.data[0].lid;
			
			axios.get('http://3.34.212.92:8080/api/letter/write', {
				params: {
					letterId: `${lid}`,
					generateType: `${GENERATE_TYPE}`
				},
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			})
			.then(response2 => {
				console.log(response2.data.data[0]);
				navigation.navigate('createImg', { letterData: response2.data.data[0] });
				setLoading(false);
				setIsNew(false);
				setWeatherValue('');
				setTextValue('');
				setTitleValue('');
			})
			.catch(error2 => {
				// console.log(error2.response.data);
				if (error2.response && error2.response.status === 401) {
					console.log("unauth");
					navigation.navigate('login');
				} else {
					console.error(error2);
				}
			});

		})
		.catch(error1 => {
			if (error1.response && error1.response.status === 401) {
				console.log("unauth");
				navigation.navigate('login');
			} else {
				console.error(error1);
			}
		});
	};
  
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
			<View style={styles.letter}>
				<Winfo weatherValue={weatherValue} setWeatherValue={setWeatherValue} editable={isNew}/>
				<Wtitle titleValue={titleValue} setTitleValue={setTitleValue} editable={isNew}/>

				<View style={styles.letterPic}>
					{loading ? (
						<ActivityIndicator size="large" color={color.b2} />
					) : (
						<Text>그림 X</Text>
					)}
				</View>

				<Wtext textValue={textValue} setTextValue={setTextValue} editable={isNew}/>
				
				<View style={styles.letterBtn}>
					<Pressable
						style={[styles.button, styles.buttonN]}
						onPress={saveLetter}>
						<Text style={styles.textStyle}>그림 생성하기</Text>
					</Pressable>
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

// 나는 오늘 친구들과 함께 놀이동산에 놀러갔다. 나는 오늘 강아지와 공원에서 산책했다.