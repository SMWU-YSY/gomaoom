import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WriteLetter from "./components/WriteLetter";
import Outbox from "./components/Outbox";
import SendLetter from "./components/SendLetter";
import OutboxDetail from "./components/OutboxDetail";
import MessageBox from "./components/MessageBox";
import ReceivedMessage from "./components/ReceivedMessage";
import SentMessage from "./components/SentMessage";
import Auth from "./Auth";
import Login from "./Login";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import CreateLetterImg from "./components/CreateLetterImg";
import App from "./App";

const Stack = createNativeStackNavigator()

export default function StackNav({ screenName,navigation }){

	return (
		<Stack.Navigator>
			{/* 탭 바에서 선택 시 바로 보여지는 페이지 
				(작성하기, 보낸 보관함)
			*/}
			{screenName === 'write' ? (
				<Stack.Screen name="write" component={WriteLetter} options={{unmountOnBlur: true,headerShown: false}} initialParams={{isNew:true}} />
			
			) : null}

			{screenName === 'sendList' ? (
				<Stack.Screen name="sendList" component={Outbox} options={{headerShown: false}}/>
			) : null}

			{screenName === 'receivedList' ? (
				<Stack.Screen name="receivedList" component={MessageBox} options={{headerShown: false}}/>
			): null}

			{screenName === "signup" ? (
				<Stack.Screen name="signup" component={Auth} options={{headerShown: false}}/>
			): null}

			{/* 그 외  페이지 이동 
				(작성 후 전송 정보 작성 페이지, 보관함 리스트에서 선택 후 보여지는 상세 페이지)
			*/}
			<Stack.Screen name="createImg" component={CreateLetterImg} options={{headerShown: false}} />
			<Stack.Screen name="send" component={SendLetter} options={{headerShown: false}} />
			<Stack.Screen name="detail" component={OutboxDetail} options={{headerShown: false}} initialParams={{userId:'', accessToken:''}} />
			<Stack.Screen name="ReceivedMessage" component={ReceivedMessage} options={{headerShown: false}} />
			<Stack.Screen name="SentMessage" component={SentMessage} options={{headerShown: false}} />
			<Stack.Screen name="login" component={Login} options={{headerShown: false}} />
			<Stack.Screen name="signup" component={Auth} options={{headerShown: false}} />
			<Stack.Screen name="isLogin" component={App} options={{headerShown: false}} initialParams={{userId:'', accessToken:''}}/>
		</Stack.Navigator>
	);
}