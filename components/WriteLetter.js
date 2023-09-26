// https://docs.expo.dev/versions/latest/sdk/async-storage/
// https://icons.expo.fyi/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Keyboard, View, 
		Platform, TouchableWithoutFeedback, Image,
		Dimensions, Pressable, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { color, commomStyle, images } from '../theme';
import axios from 'axios';

import Winfo from './write/Winfo';
import Wtitle from './write/Wtitle';
import Wtext from './write/Wtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WriteLetter({ navigation }) {
	const JWT_TOKEN = "eyJyZWdEYXRlIjoxNjk1NzA2NjA5MzQ2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ1c2VySWQxIiwiaWF0IjoxNjk1NzA2NjA5LCJleHAiOjE2OTU3MzU0MDl9.QxQ9uFVffwStz-5qsDx6ZfyYdaeE67LpFd6Bk3GLcP4";
	const GENERATE_TYPE = "karlo";

	const [weatherValue, setWeatherValue] = useState('');
	const [titleValue, setTitleValue] = useState('');
	const [textValue, setTextValue] = useState('');
	const [loading, setLoading] = useState(false);

	const saveLetter = async () => {
		setLoading(true);
		// 편지 저장
		axios.post('http://3.34.212.92:8080/api/letter/write', {
			weather: weatherValue,
			title: titleValue,
			text: textValue,
		}, {
			headers: {
				'Authorization': `Bearer ${JWT_TOKEN}`
			}
		})
		// 편지 그림 생성
		.then(response1 => {
			console.log(response1.data.data[0]);
			const lid = response1.data.data[0].lid;
			
			axios.get('http://3.34.212.92:8080/api/letter/write', {
				params: {
					letterId: `${lid}`,
					generateType: `${GENERATE_TYPE}`
				},
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`
				}
			})
			.then(response2 => {
				console.log(response2.data.data[0]);
				navigation.navigate('createImg', { letterData: response2.data.data[0] });
			})
			.catch(error2 => {
				if (error2.response.status === 401) {
					console.log("unauth");
					navigation.navigate('login');
				} else {
					console.error(error2);
				}
			});
		})
		.catch(error1 => {
			if (error1.response.status === 401) {
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
				<Winfo weatherValue={weatherValue} setWeatherValue={setWeatherValue} editable={true}/>
				<Wtitle titleValue={titleValue} setTitleValue={setTitleValue} editable={true}/>

				<View style={styles.letterPic}>
					{loading ? (
						<ActivityIndicator size="large" color={color.b2} />
					) : (
						<Text>그림 X</Text>
					)}
				</View>

				<Wtext textValue={textValue} setTextValue={setTextValue} editable={true}/>
				
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

// 나는 오늘 친구들과 함께 놀이동산에 놀러갔다.