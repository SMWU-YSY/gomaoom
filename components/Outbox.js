import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,
		Dimensions, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import { format } from "date-fns";
import { Calendar } from 'react-native-calendars';
import { color, commomStyle, images } from '../theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Outbox({navigation, route}) {
	const [accessToken,setAccessToken] = useState(null);
	const [data, setData] = useState({});
	const [posts, setPosts] = useState([]);		// 날짜
	const [selectedData, setSelectedData] = useState([]);
	// const isFocused = useIsFocused();

	useEffect(() => {
		const getData = async () => {
			const storageData = JSON.parse(await AsyncStorage.getItem("accessToken"));
			if(storageData) {
				setAccessToken(storageData);
			}
		}
		getData();
	}, []);

	useEffect(()=>{
		if(accessToken!=null){
			getSentMessage();
		}
	},[accessToken]);

	useFocusEffect(
		React.useCallback(() => {
			getSentMessage();
		}, [])
	);

	useEffect(() => {
		if (selectedDate != null){
			// console.log(selectedDate)
			// console.log(selectedData)
		}
	}, [selectedDate, selectedData])

	const getSentMessage = async()=>{
		await axios.get("http://3.34.212.92:8080/api/message/outbox", 
		{
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			withCredentials:true,
		}).then((response) => {
			setData(response.data.data[0]);

			// 날짜만
			const dates = Object.keys(response.data.data[0]);
			const newPosts = dates.map((date, index) => ({
				id : posts.length + index,
				date: date,
			}))
			setPosts(newPosts);

			const currentDate = format(new Date(), "yyyy-MM-dd")
			if (dates.includes(currentDate)){
				setSelectedData(response.data.data[0][currentDate])
			}

		}).catch((error) => {
			console.log(error);
		})	
	};

	const onPressItem = (letterId) => {
		return () => {
			// console.log(letterId)
			// console.log(selectedData)
			// console.log(selectedData[letterId])
			getMessageDetail(letterId);
		};
	}

	const getMessageDetail = async (letterId) => {
		await axios.get(`http://3.34.212.92:8080/api/letter/${letterId}`, 
		{
			headers: {
				Authorization:`Bearer ${accessToken}`,
			},
			withCredentials:true,
		}).then((response) => {
			navigation.navigate('detail', {day: selectedDate, receivers: selectedData[letterId][0].receiverNicknames, data : response.data.data[0]});
		}).catch((error) => {
			console.log(error);
		})
	}

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
		setSelectedData(data[day.dateString])
	}

	function isSelected(element) {
		if (element.date === selectedDate){
			return true;
		}
		return false
	}	

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
			<View style={styles.letter}>
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
				<ScrollView style={styles.outerScrollView}>
					<View style={styles.innerContainer}>
					{Array.from({ length: Math.ceil(Object.keys(selectedData).length / 2) }).map((_, rowIndex) => (
						<View key={rowIndex} style={styles.row}>
						{Object.keys(selectedData).slice(rowIndex * 2, rowIndex * 2 + 2).map((item, index) => (
							<TouchableOpacity key={index} style={styles.listPost} onPress={onPressItem(item)}>
								<Image source={{ uri: selectedData[item][0].letterImage }} style={styles.image} resizeMode='contain' />
							</TouchableOpacity>
						))}
						</View>
					))}
					</View>
				</ScrollView>
				: <View style={styles.outerScrollView}></View> 
				}
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
		marginTop: 60
	},
	outerScrollView: {
		flex: 1,
		width: SCREEN_WIDTH-40,
	},
	innerContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		marginHorizontal: 10,
		marginVertical: 10,
		// alignItems: "center"
	},
	row: {
		flexDirection: "row"
	},
	listPost: {
		width: SCREEN_WIDTH/2.5,
		height: 160,
		margin: 5,
		borderWidth: 1,
	},
	image: {
		width: "100%",
		height: "100%",
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
