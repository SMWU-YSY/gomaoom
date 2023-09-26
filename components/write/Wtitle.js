import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

export default function Wtitle({ titleValue, setTitleValue, editable }) {
	const onChangeTitle = (payload) => setTitleValue(payload);

	return (
		<View style={styles.letterTitle}>
			{editable ? (
				<TextInput 
				onChangeText={onChangeTitle}
				returnKeyType='done'
				value={titleValue}
				placeholder="제목을 입력하세요" 
				style={{
					flex: 1,
					fontSize: 23,
					marginLeft: 10,
				}}
			// maxLength={17}
			/>
			) : <Text style={{
					flex: 1,
					fontSize: 23,
					marginLeft: 10,
				}}>{titleValue}</Text>}
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
