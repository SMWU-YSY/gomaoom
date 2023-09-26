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

const Stack = createNativeStackNavigator()

export default function StackNav({ screenName }){

	const navigation = useNavigation();

	// useEffect(() => {
	// 	// 특정 조건이 충족되거나 이벤트가 발생할 때 Stack.Screen을 리셋
	// 	const shouldResetStack = true; // 리셋 조건 예시
	// 	if (shouldResetStack) {
	// 		navigation.reset({
	// 			index: 0,
	// 			routes: [{ name: 'write' }] // 리셋할 화면의 이름
	// 			});
	// 	}
	//   }, []);

	return (
		<Stack.Navigator>
			{/* 탭 바에서 선택 시 바로 보여지는 페이지 
				(작성하기, 보낸 보관함)
			*/}
			{screenName === 'write' ? (
				<Stack.Screen name="write" component={WriteLetter} options={{headerShown: false}} />
			) : null}

			{screenName === 'sendList' ? (
				<Stack.Screen name="sendList" component={Outbox} options={{headerShown: false}}/>
			) : null}

			{screenName === 'receivedList' ? (
				<Stack.Screen name="receivedList" component={MessageBox} options={{headerShown: false}}/>
			): null}

			{screenName === 'signup' ? (
				<Stack.Screen name="signup" component={Auth} options={{headerShown: false}}/>
			): null}

			{/* 그 외  페이지 이동 
				(작성 후 전송 정보 작성 페이지, 보관함 리스트에서 선택 후 보여지는 상세 페이지)
			*/}
			<Stack.Screen name="createImg" component={CreateLetterImg} options={{headerShown: false}} />
			<Stack.Screen name="send" component={SendLetter} options={{headerShown: false}} />
			<Stack.Screen name="detail" component={OutboxDetail} options={{headerShown: false}} />
			<Stack.Screen name="ReceivedMessage" component={ReceivedMessage} options={{headerShown: false}} />
			<Stack.Screen name="SentMessage" component={SentMessage} options={{headerShown: false}} />
			<Stack.Screen name="login" component={Login} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}