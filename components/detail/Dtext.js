import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { color, commomStyle, images } from '../../theme';

export default function Dtext(props) {

	return (
		<View style={styles.letterText}>
			<ScrollView style={{flex: 1}}>
				{/* <Text>편지 내용</Text> */}
				<Text style={{fontSize: 23, 
							paddingHorizontal: 14, 
							paddingVertical: 8,
							
				}}>{props.text}</Text>
			</ScrollView>
			{/* <ScrollView style={{flex: 1}}>
				<Text>부가 메시지</Text>
				<Text style={{fontSize: 23, 
							paddingHorizontal: 14, 
							paddingVertical: 8,
							
				}}>{props.extra}</Text>
			</ScrollView> */}
		</View>
	);
};

const styles = StyleSheet.create({
	letterText: {
		flex: 5,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		backgroundColor: color.b5,
	},
});
