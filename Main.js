import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import StackNav from './StackNav';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import { useState } from 'react';
import Login from './Login';
import Auth from './Auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Main() {
  const [isLogin,setIsLogin]=useState(false);
  const [accessToken,setAccessToken]=useState('');
  
  useEffect(() => {
    const getData = async () => {
        const storageData = 
          JSON.parse(await AsyncStorage.getItem("accessToken"));
        if(storageData) {
            setAccessToken(storageData);
            setIsLogin(true);
        }
    }
    // AsyncStorage에 저장된 데이터가 있다면, 불러온다.
    getData();

    // 데이터 지우기
    // AsyncStorage.clear();
}, []);
  return (
    <View style={styles.background}>
      {/* <Image source={require('gomaoom/assets/blueTop.png')}/> */}

      <StatusBar style="auto" />
      {isLogin?(
        <NavigationContainer independent={true} style={styles.nav}>
        <Tab.Navigator
          initialRouteName="홈"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === '홈') {
              iconName = focused
              ? require('./assets/icons/Home.png')
              : require('./assets/icons/Home.png');
            } else if (route.name === '받은 보관함') {
              iconName = focused
              ? require('./assets/icons/mailbox.png')
              : require('./assets/icons/mailbox.png');
            } else if (route.name === '보낸 보관함') {
              iconName = focused
              ? require('./assets/icons/mailbox.png')
              : require('./assets/icons/mailbox.png');
            } else if (route.name === '작성하기') {
              iconName = focused
              ? require('./assets/icons/Write.png')
              : require('./assets/icons/Write.png');
            } 

              return (
                <Image source={iconName} style={{width: 25, height: 25}} />
              );
            },
          })}>
          <Tab.Screen name="받은 보관함" options={{headerShown: false,}}>
          {() => <StackNav screenName="receivedList" />}
          </Tab.Screen>

          <Tab.Screen name="보낸 보관함" options={{headerShown: false,}}>
		  		{() => <StackNav screenName="sendList" />}
			    </Tab.Screen>
          
          <Tab.Screen name="홈" component={Home} options={{headerShown: false,}}/>
          <Tab.Screen name="작성하기" options={{headerShown: false,}}>
		  		{() => <StackNav screenName="write" />}
			</Tab.Screen>

        </Tab.Navigator>
       </NavigationContainer>
      ):(
        <NavigationContainer independent={true} style={styles.nav}>
        <Tab.Navigator
        initialRouteName='로그인'
        screenOptions={({route}) => ({
				tabBarIcon: ({focused, color, size}) => {
				let iconName;
				if (route.name === '로그인') {
					iconName = focused
					? require('./assets/icons/Home.png')
					: require('./assets/icons/Home.png');
				} 
              return (
                <Image source={iconName} style={{width: 25, height: 25}} />
              );
            },
          })}>
          
          <Tab.Screen name="로그인" component={Login} options={{tabBarStyle: {display: 'none'}}}/>
          <Tab.Screen name="signup" component={Auth} options={{tabBarStyle: {display: 'none'}}}/>
        </Tab.Navigator>
      </NavigationContainer>
      )}
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#FFFCF8',
    flex:1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav:{
    backgroundColor:'#CCE0CC',
    padding:40,
  },
  
  
});
