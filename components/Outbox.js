import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,
		Dimensions, Pressable, ScrollView, Image } from 'react-native';
import { format } from "date-fns";
import { Calendar } from 'react-native-calendars';
import { color, commomStyle, images } from '../theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Outbox({navigation, route}) {
	const [userId,setUserId]=useState();
	const [accessToken,setAccessToken]=useState(null);
	const getData = async () => {
		const storageData = JSON.parse(await AsyncStorage.getItem("accessToken"));
		
		if(storageData) {
			setAccessToken(storageData);
		}
	}
	useEffect(()=>{
		getData();
	},[]);
	useEffect(()=>{
		console.log(accessToken);
		if(accessToken!=null){
			getSentMessage();
		}

	},[accessToken]);
	const getSentMessage=()=>{
		axios.get("http://3.34.212.92:8080/api/message/outbox", 
		{
			headers: {
				Authorization:`Bearer ${accessToken}`,
			},
			withCredentials:true,
		}).then((response)=>{
			console.log(response.data);
		}).catch((error)=>{
			console.log(error);

		})
		
	};
	const onPress = () => navigation.navigate('detail', {date: selectedDate});
	const [selectMarkDate, setSelectMarkDate] = useState(false);

	const posts = [
		{id: 0, date: "2023-08-01",},
		{id: 1,	date: "2023-08-08",},
		{id: 2,	date: "2023-08-14",},
		{id: 3,	date: "2023-08-20",}
	];

	const markedDates = posts.reduce((acc, current) => {
		const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
		acc[formattedDate] = {marked: true};
		return acc;
	}, {});

	const [selectedDate, setSelectedDate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);

	const markedSelectedDates = {
		...markedDates,
		[selectedDate]: {
		selected: true,
		marked: markedDates[selectedDate]?.marked,
		}
	}	

	const onChangeSelect = (day) => {
		setSelectedDate(day.dateString)
	}

	function isSelected(element) {
		if (element.date === selectedDate){
			return true;
		}
	}	

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
			<View style={styles.letter}>
			{/* <View style={{width: SCREEN_WIDTH-60,height: SCREEN_HEIGHT-200,alignItems: "center",backgroundColor: "red"}}> */}
			<Calendar
				style={styles.calendar} 
				markedDates={markedSelectedDates}
				theme={{
					selectedDayBackgroundColor: color.b1,
					arrowColor: color.b1,
					dotColor: color.b1,
					todayTextColor: color.b1,
				}} 
				onDayPress={onChangeSelect}
			/>
			{posts.find(isSelected) ?
			<ScrollView style={styles.list}>
				<View style={styles.oneLine}>
					<Pressable style={styles.listPost} onPress={onPress}>
						<Text style={styles.listPic}>
							그림
						</Text>
						<Text style={styles.listText}>
							제목
						</Text>
					</Pressable>
					<Pressable style={styles.listPost} onPress={onPress}>
						<Text style={styles.listPic}>
							그림
						</Text>
						<Text style={styles.listText}>
							제목
						</Text>
					</Pressable>
				</View>

				<View style={styles.oneLine}>
					<Pressable style={styles.listPost} onPress={onPress}>
						<Text style={styles.listPic}>
							그림
						</Text>
						<Text style={styles.listText}>
							제목
						</Text>
					</Pressable>
					<Pressable style={styles.listPost} onPress={onPress}>
						<Text style={styles.listPic}>
							그림
						</Text>
						<Text style={styles.listText}>
							제목
						</Text>
					</Pressable>
				</View>
				
			</ScrollView>
			: <View style={styles.list}></View> }
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	calendar: {
		// flex: 1,
		// backgroundColor: theme.b1,
		borderWidth: 1,
		borderRadius: 15,
		width: SCREEN_WIDTH-40,
		marginVertical: 20,
		paddingVertical:10,
		shadowColor: '#000',
		shadowOffset: {
			width: 4,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		// elevation: 5,
	},
	letter:{
		position: 'relative',
	},
	list: {
		flex: 1,
		// backgroundColor: color.g3,
		width: SCREEN_WIDTH-40,
	},
	oneLine: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 10,
		marginVertical: 10,
	},
	listPost: {
		width: SCREEN_WIDTH/2.5,
		height: 160,
		borderWidth: 1,
	},
	listPic: {
		backgroundColor: color.g1,
		flex: 3,
		textAlign: "center",
	},
	listText: {
		backgroundColor: color.g5,
		flex: 1,
		textAlign: "center",
	},
});
