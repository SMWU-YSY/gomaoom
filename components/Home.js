import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const Home = ({navigation, setIsLogin}) => {
	const [accessToken,setAccessToken]=useState('');
	useEffect(() => {
		const getData = async () => {
			const storageData = 
			  JSON.parse(await AsyncStorage.getItem("accessToken"));
			if(storageData) {
				setAccessToken(storageData);
			}
		}
		// AsyncStorage에 저장된 데이터가 있다면, 불러온다.
		getData();
	
		// 데이터 지우기
		// AsyncStorage.clear();
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
          <Image source={require('gomaoom/assets/blueTop.png')}/>

            <Text style={styles.hello}>
                눈송이님, 안녕하세요
            </Text>
			<TouchableOpacity onPress={onPress} style={{backgroundColor: "red", flex: 1}}>
					<Text>logout</Text>
				</TouchableOpacity>
            <View style={{flex:6}}>
                <Image source={require('gomaoom/assets/profile.png')}/>
                <View style={{marginHorizontal:5,flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Image source={require('gomaoom/assets/icons/face.png')}/>
                    <Image source={require('gomaoom/assets/icons/refresh.png')}/>
                </View>

				
                
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
        fontSize:20,
        flex: 1,
        marginVertical:30,        
    },
    
    
});
