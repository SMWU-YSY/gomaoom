import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions,
		Text, TextInput, Keyboard, TouchableWithoutFeedback,
		Pressable } from 'react-native';
import { theme } from '../colors';
import Slist from '../components/send/Slist';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORAGE_KEY = "@sookYSY";

export default function SendPage() {

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.trans}>

					<TextInput
						multiline={true}
						placeholder='같이 보낼 메세지'
						style={styles.message}
					>
					</TextInput>
					
					<View style={styles.info}>
						<Text style={styles.rText}>
							받는 사람
						</Text>

						<Slist />

						<View style={styles.sender}>
							<Text style={styles.sText}>보내는 사람</Text>
							<Text style={[styles.sText, styles.sName]}>예헌이가</Text>
						</View>
						
					</View>
				
					<View style={styles.btn}>
						<Pressable style={styles.btnStyle}>
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
		backgroundColor: theme.bg,
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
		backgroundColor: theme.b2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});