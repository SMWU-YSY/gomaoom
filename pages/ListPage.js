import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,
		Dimensions, Pressable, ScrollView } from 'react-native';
import { format } from "date-fns";
import { Calendar } from 'react-native-calendars';
import { theme } from '../colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ListPage({navigation}) {

	const onPress = () => navigation.navigate('detail', {date: selectedDate});

	const posts = [
		{
			id: 0,
			date: "2023-08-01",
		},
		{
			id: 1,
			date: "2023-08-05",
		},
		{
			id: 2,
			date: "2023-08-14",
		},
		{
			id: 3,
			date: "2023-08-20",
		}
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

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{/* <View style={{width: SCREEN_WIDTH-60,height: SCREEN_HEIGHT-200,alignItems: "center",backgroundColor: "red"}}> */}
			<Calendar
				style={styles.calendar} 
				markedDates={markedSelectedDates}
				theme={{
					selectedDayBackgroundColor: theme.b1,
					arrowColor: theme.b1,
					dotColor: theme.b1,
					todayTextColor: theme.b1,
				}} 
				onDayPress={(day) => setSelectedDate(day.dateString)}
			/>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
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
	list: {
		flex: 1,
		// backgroundColor: theme.g3,
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
		backgroundColor: theme.g1,
		flex: 3,
		textAlign: "center",
	},
	listText: {
		backgroundColor: theme.g5,
		flex: 1,
		textAlign: "center",
	},
});
