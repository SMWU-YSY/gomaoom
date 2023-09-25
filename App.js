import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Write from './components/Write';
import MessageBox from './components/MessageBox';
import ReceivedMessage from './components/ReceivedMessage';
import SentMessage from './components/SentMessage';
import WritePage from './pages/WritePage';
import ListPage from './pages/ListPage';
import StackNav from './StackNav';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.background}>
      {/* <Image source={require('gomaoom/assets/blueTop.png')}/> */}

      <StatusBar style="auto" />
      <NavigationContainer style={styles.nav}>
        <Tab.Navigator
			initialRouteName='홈'
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

			<Tab.Screen name="회원가입" options={{headerShown: false,}}>
		  		{() => <StackNav screenName="signup" />}
			</Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
      
      
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
