import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WritePage from "./pages/WritePage";
import ListPage from "./pages/ListPage";
import SendPage from "./pages/SendPage";
import DetailPage from "./pages/DetailPage";
import MessageBox from "./components/MessageBox";
import ReceivedMessage from "./components/ReceivedMessage";
import SentMessage from "./components/SentMessage";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

export default function StackNav({ screenName }){

	const navigation = useNavigation();

	useEffect(() => {
		// 특정 조건이 충족되거나 이벤트가 발생할 때 Stack.Screen을 리셋
		const shouldResetStack = true; // 리셋 조건 예시
		if (shouldResetStack) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'write' }] // 리셋할 화면의 이름
				});
		}
	  }, []);

	return (
		<Stack.Navigator>
			{/* 탭 바에서 선택 시 바로 보여지는 페이지 
				(작성하기, 보낸 보관함)
			*/}
			{screenName === 'write' ? (
				<Stack.Screen name="write" component={WritePage} options={{headerShown: false}} />
			) : null}

			{screenName === 'sendList' ? (
				<Stack.Screen name="sendList" component={ListPage} options={{headerShown: false}}/>
			) : null}

			{screenName === 'receivedList' ? (
				<Stack.Screen name="receivedList" component={MessageBox} options={{headerShown: false}}/>
			): null}

			{/* 그 외  페이지 이동 
				(작성 후 전송 정보 작성 페이지, 보관함 리스트에서 선택 후 보여지는 상세 페이지)
			*/}
			<Stack.Screen name="send" component={SendPage} options={{headerShown: false}} />
			<Stack.Screen name="detail" component={DetailPage} options={{headerShown: false}} />
			<Stack.Screen name="ReceivedMessage" component={ReceivedMessage} options={{headerShown: false}} />
			<Stack.Screen name="SentMessage" component={SentMessage} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}