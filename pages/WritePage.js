// https://docs.expo.dev/versions/latest/sdk/async-storage/
// https://icons.expo.fyi/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Keyboard, View, 
		Platform, TouchableWithoutFeedback, 
		Dimensions, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';
import { theme } from '../colors';

import Winfo from '../components/write/Winfo';
import Wtitle from '../components/write/Wtitle';
// import Wtext from '../components/write/Wtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WritePage({ navigation }) {
	const [pic, setPic] = useState(false);
	const onPress = () => navigation.navigate('send');

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.letter}>
				<Winfo />
				<Wtitle />

				<View style={styles.letterPic}>
					{pic ? <Text>그림 O</Text> : <Text>그림 X</Text>}
				</View>

				{/* <Wtext /> */}
				<KeyboardAvoidingView style={{flex: 5.5, backgroundColor: theme.b5}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<TextInput
						style={{fontSize: 20, marginLeft: 8}}
						multiline={true}
						placeholder='편지를 작성하세요.'
					>
					</TextInput>
				</KeyboardAvoidingView>
				
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
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
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
		backgroundColor: theme.b2,
		marginHorizontal: 15,
	},
	buttonY: {
		backgroundColor: theme.b2,
		margin: 10,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
