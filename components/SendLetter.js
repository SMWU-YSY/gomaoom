import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions,
		Text, TextInput, Keyboard, TouchableWithoutFeedback,
		Pressable } from 'react-native';
import { color, commomStyle, images } from '../theme';
import Slist from './send/Slist';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORAGE_KEY = "@sookYSY";

export default function SendLetter({navigation, route}) {
	const JWT_TOKEN = "eyJyZWdEYXRlIjoxNjk1NzA2NjA5MzQ2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ1c2VySWQxIiwiaWF0IjoxNjk1NzA2NjA5LCJleHAiOjE2OTU3MzU0MDl9.QxQ9uFVffwStz-5qsDx6ZfyYdaeE67LpFd6Bk3GLcP4";
	const letterData = route.params.letterData;

	const [extraValue, setExtraValue] = useState("");
	const [member, setMember] = useState([]);
	const [recipientList, setRecipientList] = useState([]);

	const onChangeText = (payload) => setExtraValue(payload);

	const transferLetter = async () => {

		console.log(extraValue);
		console.log(letterData.lid)
		console.log(member);

		axios.post('http://3.34.212.92:8080/api/message/write', {
			extra: extraValue,
			letterId: letterData.lid,
			recipientLoginIds: recipientList
		}, {
			headers: {
				'Authorization': `Bearer ${JWT_TOKEN}`
			}
		})
		.then(response => {
			console.log(response.data.data[0]);
			navigation.navigate('SentMessage');
		})
		.catch(error => {
			// if (error.response.status === 401) {
			// 	console.log("unauth");
			// 	navigation.navigate('login');
			// } else {
				console.error(error);
			// }
		})
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.trans}>
				
				<TextInput
					multiline={true}
					placeholder='같이 보낼 메세지'
					style={styles.message}
					value={extraValue}
					onChangeText={onChangeText}
				>
				</TextInput>
				
				<View style={styles.info}>
					<Text style={styles.rText}>
						받는 사람
					</Text>

					<Slist member={member} setMember={setMember}/>

					<View style={styles.sender}>
						<Text style={styles.sText}>보내는 사람</Text>
						<Text style={[styles.sText, styles.sName]}>예헌이가</Text>
					</View>
				</View>
				
				<View style={styles.btn}>
					<Pressable onPress={transferLetter} style={styles.btnStyle}>
						<Text style={styles.textStyle}>전송하기</Text>
					</Pressable>
				</View>
					
			</View>
		</View>	
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	trans: {
		backgroundColor: "white",
		width: SCREEN_WIDTH-60,
		height: SCREEN_HEIGHT-200,
		borderRadius: 15,
		borderWidth: 1,
		alignItems: "center",
	},
	message: {
		flex: 0.7,
		backgroundColor: "lightgrey",
		borderWidth: 1,
		width: SCREEN_WIDTH-90,
		marginTop: 12,
		padding: 8,
		borderRadius: 10,
		fontSize: 20,
	},
	info: {
		flex: 2.5,
		width: SCREEN_WIDTH - 90,
		marginTop: 10,
	},
	rText: {
		flex: 0.5,
		fontSize: 18,
		paddingHorizontal: 8,
	},
	sender: {
		flex: 0.9,
		justifyContent: "space-between"
	},
	sText: {
		fontSize: 18,
		textAlign: "right",
	},
	sName: {
		fontWeight: "bold",
		fontSize: 28,
	},
	btn: {
		flex: 0.7,
		alignItems: "center",
		justifyContent: "center",
	},
	btnStyle: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: color.b2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});