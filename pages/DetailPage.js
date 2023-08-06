import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
		View, Dimensions } from 'react-native';
import { theme } from '../colors';
import Dinfo from '../components/detail/Dinfo';
import Dtitle from '../components/detail/Dtitle';
import Dtext from '../components/detail/Dtext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DetailPage({ route }) {
	const [member, setMember] = useState([{id: 0, name: '회원1'}, {id: 1, name: '회원2'}, {id: 2, name: '회원3'}])
	const [notmember, setNotmember] = useState([{id: 0, tel: '01012341234'}])

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.letter}>
				<Dinfo date={route.params.date}/>
				<Dtitle />

				<View style={styles.letterPic}>
					<Text>그림 O</Text>
				</View>

				<Dtext />
				
				<View style={styles.letterTo}>
					<Text style={{fontSize: 20, paddingLeft: 10, marginTop: 5, flex: 1}}>받은 사람</Text>

					<View style={styles.memlist}>
						{member.map((item) => (
							<View key={item.id} style={[styles.text, styles.id]}>
								<Text style={styles.text}>
									{item.name}
								</Text>
							</View>
						))}
						{notmember.map((item) => (
							<View style={[styles.text, styles.tel]}>
								<Text key={item.id} style={styles.text}>
									{item.tel}
								</Text>
							</View>
						))}
					</View>
				</View>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
		// paddingHorizontal: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	letter: {
		backgroundColor: "white",
		width: SCREEN_WIDTH-60,
		height: SCREEN_HEIGHT-200,
		borderRadius: 15,
		borderWidth: 1,
	},
	letterPic: {
		flex: 3.5,
		borderBottomWidth: 1,
		borderBottomColor: "black",
		alignItems: "center",
		justifyContent: "center"
	},
	letterTo: {
		flex: 2.5,
		// alignItems: "center",
		justifyContent: "center"
	},
	memlist: {
		flex: 3,
		flexDirection: "row",
		flexWrap: "wrap",
		paddingLeft: 4,
	},
	text: {
		fontSize: 13,
		color: "white",
		padding: 2,
		margin: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	id: {
		backgroundColor: theme.b1,
		borderWidth: 1,
		borderRadius: 15,
	},
	tel: {
		backgroundColor: theme.g5,
		borderWidth: 1,
		borderRadius: 15,
	},
});
