import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Dtitle() {

	return (
		<View style={styles.letterTitle}>
			<Text 
				style={{
					flex: 1,
					fontSize: 23,
					marginLeft: 10,
				}}
			>
				안녕하세요.
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	letterTitle: {
		flex: 0.9,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		flexDirection: "row",
		alignItems: "center",
	},
});
