import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 

export default function Dinfo(props) {

	const[sun, setSun] = useState(true);
	const[cloud, setCloud] = useState(false);
	const[rain, setRain] = useState(false);
	const[snow, setSnow] = useState(false);

	return (
		<View style={styles.letterInfo}>
			<View style={styles.letterDate}>
				<Text style={{
					fontSize: 18,
					fontWeight: "600",
				}}>
					{props.date}
				</Text>
			</View>

			<View style={styles.letterWeather}>
				<Fontisto name="day-sunny" size={28} color={sun?"red":"grey"}></Fontisto>
				<Fontisto name="cloudy" size={28} color={cloud?"red":"grey"}></Fontisto>
				<Fontisto name="rain" size={28} color={rain?"red":"grey"}></Fontisto>
				<Fontisto name="snow" size={28} color={snow?"red":"grey"}></Fontisto>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	letterInfo: {
		flex: 0.9,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	letterDate: {
		flex: 1,
		borderRightWidth: 1,
		borderRightColor: "black",
		alignItems: "center",
		justifyContent: "center"
	},
	letterWeather: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
});