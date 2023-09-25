// https://docs.expo.dev/versions/latest/sdk/async-storage/
// https://icons.expo.fyi/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Keyboard, View, 
		Platform, TouchableWithoutFeedback, Image,
		Dimensions, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';
import { color, commomStyle, images } from '../theme';
import axios from 'axios';

import Winfo from '../components/write/Winfo';
import Wtitle from '../components/write/Wtitle';
import Wtext from '../components/write/Wtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WritePage({ navigation }) {
	const [pic, setPic] = useState(false);
	const onPress = () => navigation.navigate('send');

	// const [formData, setFormData] = useState({
	// 	title: '',
	// 	text: '',
	// 	weather: ''
	// });
  
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
			<View style={styles.letter}>
				<Winfo />
				<Wtitle />

				<View style={styles.letterPic}>
					{pic ? <Text>그림 O</Text> : <Text>그림 X</Text>}
				</View>

				<Wtext />
				
				<View style={styles.letterBtn}>
					{pic ? 
						<View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
							<Pressable
								style={[styles.button, styles.buttonY]}
								onPress={() => {
								}}>
								<Text style={styles.textStyle}>그림 재생성하기</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.buttonY]}
								onPress={onPress}>
								<Text style={styles.textStyle}>전송하기</Text>
							</Pressable>
						</View>
						: <Pressable
							style={[styles.button, styles.buttonN]}
							onPress={() => {
								setPic(true)
							}}>
							<Text style={styles.textStyle}>그림 생성하기</Text>
						</Pressable>
					}
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
