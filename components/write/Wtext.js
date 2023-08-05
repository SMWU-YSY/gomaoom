import React, {useEffect, useState} from 'react';
import { Alert, ScrollView, StyleSheet, Text, 
	TextInput, View, Dimensions, Modal, Pressable } from 'react-native';
	import { theme } from '../../colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Wtext() {
	const [text, setText] = useState("");
	const [modalText, setModalText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const onChangeText = (payload) => setText(payload);
	const onChangeModalText = (payload) => setModalText(payload);

	return (
		<View style={styles.letterText}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setModalVisible(!modalVisible);
			}}>
				<View style={styles.modalCenteredView}>
					<View style={styles.modalView}>
						<TextInput
							multiline={true}
							style={{backgroundColor: "#EBF5FA", 
									width: SCREEN_WIDTH/1.5, 
									height: SCREEN_HEIGHT/4,
									fontSize: 22
								}}
							onChangeText={onChangeModalText}
							value={modalText}
						>
						</TextInput>
								
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => {
								setModalVisible(!modalVisible)
								setText(modalText)
						}}>
							<Text style={styles.textStyle}>작성 완료</Text>
						</Pressable>
					</View>
				</View>
			</Modal> 
			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => setModalVisible(true)}>
				<Text style={styles.textStyle}>편지 작성하기</Text>
			</Pressable>
			<ScrollView style={{flex: 1}}>
				<Text style={{fontSize: 23, 
							paddingHorizontal: 14, 
							paddingVertical: 8,
							
				}}>{text}</Text>
			</ScrollView>
					
		</View>
		
	);
};

const styles = StyleSheet.create({
	letterText: {
		flex: 5.5,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		backgroundColor: theme.b5,
	},
	modalCenteredView: {
		flex: 1,
		alignItems: 'center',
		marginTop: 150,

	},
	modalView: {
		margin: 25,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: theme.b2,
		marginVertical: 10,
		marginHorizontal: 15,
	},
	buttonClose: {
		backgroundColor: theme.b2,
		marginTop: 20
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
