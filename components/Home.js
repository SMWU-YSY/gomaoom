import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { commomStyle } from '../theme';

const Home = ({navigation, setIsLogin}) => {
	const [accessToken,setAccessToken]=useState('');
	const [userNick, setUserNick] = useState('');

	useEffect(() => {
		const getData = async () => {
			const storageData = JSON.parse(await AsyncStorage.getItem("accessToken"));
			const userData = JSON.parse(await AsyncStorage.getItem("userNick"));

			if(storageData) {
				setAccessToken(storageData);
			}
			if (userData){
                setUserNick(userData);
            }
		}
		// AsyncStorage에 저장된 데이터가 있다면, 불러온다.
		getData();
	}, []);

	const onPress = async () => {

		try {
			const response = await axios.post('http://3.34.212.92:8080/api/user/logout', {
			  headers: {
				'Authorization': `Bearer ${accessToken}`
			  }
			});
			// console.log(response.data.data[0]);

		} catch (error) {
			if (error.response && error.response.status === 401) {
			  	console.log("unauth");
			//   navigation.navigate('login');
			} else {
			  	console.error(error);
			}
		} finally {
			setIsLogin(false);
			AsyncStorage.clear();
		}
	};

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Image source={require('gomaoom/assets/blueTop.png')} 
                style={{position:'absolute',top:0,left:0}}
            ></Image>

            <Text style={styles.hello}>
                {userNick}님, 안녕하세요
            </Text>
			
            <View style={{flex:10}}>
                <Image source={require('gomaoom/assets/profile.png')}/>
                {/* <View style={{marginHorizontal:5,flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Image source={require('gomaoom/assets/icons/face.png')}/>
                    <Image source={require('gomaoom/assets/icons/refresh.png')}/>
                </View> */}
				<TouchableOpacity onPress={onPress} style={styles.btn}>
					<Text style={styles.btnText}>로그아웃</Text>
				</TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    background:{
        backgroundColor: '#FFFCF8',
        flex:1,
    },
    container: {
        backgroundColor: '#FFFCF8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nav:{
        backgroundColor:'#CCE0CC',
        padding:40,
    },
    hello:{
        fontSize:25,
        flex: 2,
        // backgroundColor:'pink',
        marginTop:170,        
    },
	btn: {
        flex: 0.5,
        alignContent: "center",
        justifyContent: "center",
    },
    btnText: {
        textAlign: "center"
    }    
});
