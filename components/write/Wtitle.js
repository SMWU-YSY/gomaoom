import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default function Wtitle() {
	const [title, setTitle] = useState("");
	const onChangeTitle = (payload) => setTitle(payload);

	return (
		<View style={styles.letterTitle}>
			<TextInput 
				onChangeText={onChangeTitle}
				returnKeyType='done'
				value={title}
				placeholder="제목을 입력하세요" 
				style={{
					flex: 1,
					fontSize: 23,
					marginLeft: 10,
				}}
				// maxLength={17}
			/>
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
