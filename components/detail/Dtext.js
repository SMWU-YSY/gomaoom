import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../colors';

export default function Dtext() {

	return (
		<View style={styles.letterText}>
			<ScrollView style={{flex: 1}}>
				<Text style={{fontSize: 23, 
							paddingHorizontal: 14, 
							paddingVertical: 8,
							
				}}>안녕하세요. 저 ysy입니다. 오늘은 ~~~~했어요.</Text>
			</ScrollView>
		</View>
		
	);
};

const styles = StyleSheet.create({
	letterText: {
		flex: 5,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		backgroundColor: theme.b5,
	},
});
