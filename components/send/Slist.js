import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Dimensions, Alert,
		Text, TextInput, Pressable, Modal, TouchableOpacity,
		ScrollView } from 'react-native';
import { theme } from '../../colors';
import { AntDesign, Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Slist() {
	const [member, setMember] = useState([{id: 0, name: '회원1'}, {id: 1, name: '회원2'}, {id: 2, name: '회원3'}])
	const [notmember, setNotmember] = useState([{id: 0, tel: '01012341234'}])
	const nextMemId = useRef(4);
	const nextNotMemId = useRef(1);

	const [modalText, setModalText] = useState("");
	const [memModalVisible, setMemModalVisible] = useState(false);
	const [notMemModalVisible, setNotMemModalVisible] = useState(false);

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
		setMemModalVisible(false);
		setModalText("");
		nextMemId.current += 1;
	}

	const addNotMemList = () => {
		if (modalText === ""){
			setNotMemModalVisible(false);
			return;
		}
		const newList = [
			...notmember,
			{id: nextNotMemId.current, tel: modalText}
		];
		setNotmember(newList);
		setNotMemModalVisible(false);
		setModalText("");
		nextNotMemId.current += 1;
	}

	const deleteMemList = id => {
		setMember(
			member.filter(user => {
				return user.id !== id;
			})
		)
	}

	const deleteNotMemList = id => {
		setNotmember(
			notmember.filter(user => {
				return user.id !== id;
			})
		)
	}

	return (
		
		<View style={styles.rList}>
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
						<Text>아이디 추가</Text>
						<TextInput
							style={styles.input}
							onChangeText={onChangeModalText}
							value={modalText}
						>
						</TextInput>
								
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={addMemList}>
							<Text style={styles.textStyle}>작성 완료</Text>
						</Pressable>
					</View>
				</View>
			</Modal> 

			{/* 비회원 추가 창 */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={notMemModalVisible}
				onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setNotMemModalVisible(!notMemModalVisible);
			}}>
				<View style={styles.modalCenteredView}>
					<View style={styles.modalView}>
					<Text>전화번호 추가</Text>
						<TextInput
							style={styles.input}
							keyboardType="decimal-pad"
							onChangeText={onChangeModalText}
							value={modalText}
						>
						</TextInput>
								
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={addNotMemList}>
							<Text style={styles.textStyle}>작성 완료</Text>
						</Pressable>
					</View>
				</View>
			</Modal> 

			<View style={styles.member}>
				<View style={styles.memlist}>
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
				<View style={styles.memlist}>
					{notmember.map((item) => (
						<View style={[styles.text, styles.tel]}>
							<Text key={item.id} style={styles.text}>
								{item.tel}
							</Text>
							<TouchableOpacity onPress={() => deleteNotMemList(item.id)}>
								<Feather name="x" size={18} color="black" />
							</TouchableOpacity>
						</View>
					))}
				</View>
			</View>


			<View style={styles.addBtn}> 
				<Pressable
					style={[styles.button, styles.buttonOpen]}
					onPress={() => {setMemModalVisible(true); setNotMemModalVisible(false);}}
				>
					<AntDesign name="pluscircleo" size={18} color="white" />
					<Text style={styles.textStyle}>친구 추가 (아이디)</Text>
				</Pressable>
				<Pressable
					style={[styles.button, styles.buttonOpen]}
					onPress={() => {setMemModalVisible(false); setNotMemModalVisible(true);}}
				>
					<AntDesign name="pluscircleo" size={18} color="white" />
					<Text style={styles.textStyle}>비회원 추가 (전화번호)</Text>
				</Pressable>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
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
	addBtn: {
		flex: 1,
		alignContent: "center"
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
		backgroundColor: theme.b5, 
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
		backgroundColor: theme.g2,
		// marginVertical: 10,
		marginHorizontal: 10,
		width: SCREEN_WIDTH/1.8,
	},
	buttonClose: {
		backgroundColor: theme.g2,
		marginTop: 10
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		marginHorizontal: 12,
		fontSize: 15,
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
		fontSize: 13,
		color: "white",
		padding: 2,
		paddingHorizontal: 3,
		margin: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	id: {
		backgroundColor: theme.b1,
		borderWidth: 1,
		borderRadius: 15,
	},
	tel: {
		backgroundColor: theme.g5,
		borderWidth: 1,
		borderRadius: 15,
	},
});
