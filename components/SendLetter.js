import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Image, Alert,
		Text, TextInput, Keyboard, TouchableWithoutFeedback,
		Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color, commomStyle, images } from '../theme';
import Slist from './send/Slist';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORAGE_KEY = "@sookYSY";

export default function SendLetter({navigation, route}) {
	const letterData = route.params.letterData;

	const [extraValue, setExtraValue] = useState("");
	const [member, setMember] = useState([]);
	const [recipientList, setRecipientList] = useState([]);

	const onChangeText = (payload) => setExtraValue(payload);

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

	const transferLetter = async () => {

		console.log(extraValue);
		console.log(letterData.lid)
		console.log(member);
		console.log(recipientList);

		axios.post('http://3.34.212.92:8080/api/message/write', {
			extra: extraValue,
			letterId: letterData.lid,
			recipientLoginIds: recipientList
		}, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})
		.then(response => {
			console.log(response.data.data[0]);
			navigation.navigate('SentMessage');
		})
		.catch(error => {
			console.log(error.response.data);
			if (error.response && error.response.status === 401) {
				console.log("unauth");
				navigation.navigate('login');
			} else if (error.response && error.response.data.message === "찾을 수 없는 아이디") {
				console.log("no user");
				Alert.alert(
					"에러",
					`존재하지 않는 아이디입니다.\n [ ${error.response.data.data} ]`,
					[
						{ text: "확인" }
					]
				);
			} else {
				console.error(error);
			}
		})
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
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

					<Slist member={member} setMember={setMember} setRecipientList={setRecipientList}/>

					<View style={styles.sender}>
						<Text style={styles.sText}>보내는 사람</Text>
						<Text style={[styles.sText, styles.sName]}>{letterData.userNick}</Text>
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
		position: 'relative',
		marginTop: 60
	},
	message: {
		flex: 1,
		backgroundColor: "lightgrey",
		borderWidth: 1,
		width: SCREEN_WIDTH-90,
		marginTop: 12,
		padding: 8,
		borderRadius: 10,
		fontSize: 20,
	},
	info: {
		flex: 1.8,
		width: SCREEN_WIDTH - 90,
		marginTop: 10,
	},
	sender: {
		flex: 1,
		justifyContent: "space-between",
		// backgroundColor: "blue",
		padding: 10,
	},
	sText: {
		fontSize: 18,
		textAlign: "right",
	},
	sName: {
		fontWeight: "bold",
		fontSize: 25,
	},
	btn: {
		flex: 0.7,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red"
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
		fontSize: 20,
		paddingHorizontal: 20
	},
});