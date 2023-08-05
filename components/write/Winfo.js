import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { format } from "date-fns"; 

export default function Dinfo() {

	const date = format(new Date(),"yyyy-MM-dd");

	const[sun, setSun] = useState(false);
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
					{date}
				</Text>
			</View>

			<View style={styles.letterWeather}>
				<Pressable onPress={() => {setSun(true); setCloud(false); setRain(false); setSnow(false);}}>
					<Fontisto name="day-sunny" size={28} color={sun?"red":"grey"}></Fontisto>
				</Pressable>
				<Pressable onPress={() => {setSun(false); setCloud(true); setRain(false); setSnow(false);}}>
					<Fontisto name="cloudy" size={28} color={cloud?"red":"grey"}></Fontisto>
				</Pressable>
				<Pressable onPress={() => {setSun(false); setCloud(false); setRain(true); setSnow(false);}}>
					<Fontisto name="rain" size={28} color={rain?"red":"grey"}></Fontisto>
				</Pressable>
				<Pressable onPress={() => {setSun(false); setCloud(false); setRain(false); setSnow(true);}}>
					<Fontisto name="snow" size={28} color={snow?"red":"grey"}></Fontisto>
				</Pressable>
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