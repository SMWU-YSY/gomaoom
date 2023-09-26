import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Dimensions, Alert,
		Text, TextInput, Pressable, Modal, TouchableOpacity,
		ScrollView, 
		TouchableWithoutFeedback} from 'react-native';
import { color, commomStyle, images } from '../../theme';
import { AntDesign, Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Slist({member, setMember, setRecipientList}) {
	// const [member, setMember] = useState([]);
	const nextMemId = useRef(4);

	const [modalText, setModalText] = useState("");
	const [memModalVisible, setMemModalVisible] = useState(false);

	const onChangeModalText = (payload) => setModalText(payload);

	const addMemList = () => {
		if (modalText === ""){
			setMemModalVisible(false);
			return;
		}
		const newList = [
			...member,
			{id: nextMemId.current, name: modalText}
		];
		setMember(newList);

		const recipientNames = newList.map(item => item.name);
    	setRecipientList(recipientNames);

		setMemModalVisible(false);
		setModalText("");
		nextMemId.current += 1;
	}

	const deleteMemList = id => {
		setMember(
			member.filter(user => {
				return user.id !== id;
			})
		)

		const recipientNames = member.filter(user => user.id !== id).map(item => item.name);
    	setRecipientList(recipientNames);
	}

	return (
		
		<View style={styles.rList}>
			<View style={styles.recipList}>
				<Text style={styles.rText}>
					받는 사람
				</Text>
				<Pressable
					style={[styles.button, styles.buttonOpen]}
					onPress={() => {setMemModalVisible(true);}}
				>
					<AntDesign name="pluscircleo" size={20} color="black" />
					{/* <Text style={styles.textStyle}>친구 추가 (아이디)</Text> */}
				</Pressable>
			</View>
			
			{/* 회원 추가 창 */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={memModalVisible}
				onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setMemModalVisible(!memModalVisible);
			}}>
				<View style={styles.modalCenteredView}>
					<View style={styles.modalView}>
						<TextInput
							style={styles.input}
							onChangeText={onChangeModalText}
							value={modalText}
						>
						</TextInput>
								
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={addMemList}>
							<Text style={styles.textStyle}>아이디 추가</Text>
						</Pressable>
					</View>
				</View>
			</Modal> 

			<ScrollView style={styles.member}>
				<View style={styles.memlist} onStartShouldSetResponder={() => true}>
					{member.map((item) => (
						<View key={item.id} style={[styles.text, styles.id]}>
							<Text style={styles.text}>
								{item.name}
							</Text>
							<TouchableOpacity onPress={() => deleteMemList(item.id)}>
								<Feather name="x" size={18} color="black" />
							</TouchableOpacity>
						</View>
					))}
				</View>
			</ScrollView>


			
			
		</View>
	);
}

const styles = StyleSheet.create({
	recipList: {
		flexDirection: "row",
		// backgroundColor: "blue",
		width: SCREEN_WIDTH-90,
	},
	rText: {
		flex: 0.3,
		fontSize: 20,
		fontWeight: "bold",
		paddingHorizontal: 8,
		marginTop: 10,
		// backgroundColor: "red"
	},
	addBtn: {
		flex: 0.8,
		alignContent: "center"
	},
	rList: {
		flex: 5,
		marginBottom: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	member: {
		flex: 2,
		borderWidth: 1,
		marginBottom: 5,
		width: SCREEN_WIDTH-100,
	},
	
	modalCenteredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: "center",
	},
	modalView: {
		margin: 25,
		// flex: 1,
		width: SCREEN_WIDTH-150,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: "center",
	},
	input: {
		// backgroundColor: color.b5, 
		borderWidth: 1,
		borderColor: color.b1, 
		borderRadius: 15,
		height: 50,
		textAlign: "center",
		fontSize: 22, 
		margin: 10,
		width: SCREEN_WIDTH-200,
	},
	button: {
		borderRadius: 20,
		padding: 8,
		elevation: 2,
		flexDirection: "row",
		marginVertical: 4,
		alignItems: "center"
	},
	buttonOpen: {
		paddingHorizontal: 0
	},
	buttonClose: {
		marginTop: 10,
	},
	textStyle: {
		// color: 'white',
		color: color.b1,
		fontWeight: 'bold',
		textAlign: 'center',
		marginHorizontal: 12,
		fontSize: 20,
		// fontSize: 20, fontWeight: "bold", 
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	memlist: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingTop: 4,
		paddingLeft: 4,
	},
	text: {
		fontSize: 15,
		color: "white",
		padding: 2,
		paddingHorizontal: 5,
		margin: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	id: {
		backgroundColor: color.b2,
		borderWidth: 1,
		borderRadius: 15,
	},
	tel: {
		backgroundColor: color.g5,
		borderWidth: 1,
		borderRadius: 15,
	},
});
