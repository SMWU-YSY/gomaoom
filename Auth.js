import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { commomStyle, images } from './theme';

export default function Auth({navigation}) {
	const isAuth=()=>{
		Alert.alert(                    
			"회원가입이 완료되었습니다.",                    // 첫번째 text: 타이틀 제목
			"로그인해주세요.",                         // 두번째 text: 그 밑에 작은 제목
			[{text: '확인', onPress: () => {}}],
			{ cancelable: false }
		);
		navigation.navigate('login');
	};

	const onClick=async()=>{
		try {
			const response = await axios.post("http://3.34.212.92:8080/api/user/signup", 
			{	
				age: value,
				gender: value1,
				loginId: id,
				nickname: nickname,
				password:password,
			}
		  	, 
			{
				headers: {
				Accept: 'application/json',
				"Content-Type": "application/json",
				}
			});
	
			if(response){
				isAuth();
			}
		} catch (error) {
			if (error.response && error.response.status === 409){
				Alert.alert(
					"중복된 아이디",
					"아이디를 다시 입력해주세요.",
					[
						{ text: "확인" }
					]
				);
				console.log("아이디 중복");
			}
			else {
				console.log(error);
			}
		}
	};

  const [inputs,setInputs]=useState({
    nickname:'',
    id:'',
    password:'',
  });
  const {nickname,id,password}=inputs;
  const onChange=(keyvalue,e)=>{
    const {text}=e.nativeEvent
    setInputs({
      ...inputs,
      [keyvalue]:text
    });
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items, setItems] = useState([
      // {label: '10대', value: '1'},
      // {label: '20대', value: '2'},
      // {label: '30대', value: '3'},
      // {label: '40대', value: '4'},
      // {label: '50대', value: '5'},
      // {label: '60대', value: '6'},
      {label: '어린이', value: '1'},
      {label: '청소년', value: '2'},
      {label: '청년', value: '3'},
      {label: '중년', value: '4'},
      {label: '장년', value: '5'},
      {label: '노년', value: '6'},
  ]);
  const [items1, setItems1] = useState([
    {label: '여자', value: '1'},
    {label: '남자', value: '2'},
]);
  
  return(
    <View style={styles.background}>

	<Image source={images.blueTop} style={commomStyle.backgroundImage}/>
      <View style={styles.container}>
          <Text style={styles.desc}>
            반가워요! 함께 마음을 전해봐요!
          </Text>
          <Text style={{fontSize:30, fontWeight:600}}>
            회원가입
          </Text>
      </View>
      <View style={styles.btncontainer}>
        <View style={styles.btn}>
          <TextInput 
            placeholder='닉네임' 
            style={styles.inputText}
            value={nickname}
            onChange={(e)=>{onChange("nickname",e)}}
            />
        </View>
        <View style={styles.btn}>
          <TextInput 
            placeholder='아이디' 
            style={styles.inputText}
            value={id}
            onChange={(e)=>{onChange("id",e)}}
            />
        </View>
        <View style={styles.btn}>
          <TextInput 
            placeholder='비밀번호' 
            style={styles.inputText}
            value={password}
            onChange={(e)=>{onChange("password",e)}}
            />
        </View>
        <View style={{zIndex:80}}>
          <DropDownPicker 
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            listMode="SCROLLVIEW"
            placeholder="성별"
            textStyle={{
              fontSize: 20,
              textAlign:'center',
              alignItems:'center'
            }}
            labelStyle={{
              textAlign:'center',
              alignItems:'center'
            }}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            containerStyle={{
              width: '50%', 
              zIndex:10,
              marginBottom:10,
              alignItems:'center'
            }}
            style={{
              borderRadius: 20,
              borderBottomEndRadius:20,
              borderBottomStartRadius:20,
              backgroundColor:'#F1F1F1',
              borderWidth:0,
              zIndex:10,
            }}
            
            dropDownContainerStyle={{
              // position: 'relative', // to fix scroll issue ... it is by default 'absolute'
              backgroundColor:'#F1F1F1',
              borderWidth:0,
              marginBottom:10,
              borderTopEndRadius:20,
              borderTopStartRadius:20,
              borderRadius:20,
              zIndex:1000,
              top: 60, //to fix gap between label box and container
            }}
          />
        </View>
        <View>
          <DropDownPicker 
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
            placeholder="연령대"
            textStyle={{
              fontSize: 20,
              textAlign:'center',
              alignItems:'center'
            }}
            zIndex={100}
            labelStyle={{
              textAlign:'center',
              alignItems:'center'
            }}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            containerStyle={{
              width: '50%', 
              zIndex:100,
              marginBottom:10,
              alignItems:'center'
            }}
            style={{
              borderRadius: 20,
              zIndex:100,
              borderBottomEndRadius:20,
              borderBottomStartRadius:20,
              backgroundColor:'#F1F1F1',
              borderWidth:0,
            }}
            
            dropDownContainerStyle={{
              // position: 'relative', // to fix scroll issue ... it is by default 'absolute'
              backgroundColor:'#F1F1F1',
              borderWidth:0,
              marginBottom:10,
              borderTopEndRadius:20,
              borderTopStartRadius:20,
              borderRadius:20,
              top: 50, //to fix gap between label box and container

            }}
          />
        </View>
      </View>
      <View style={styles.donecontainer}>
        <TouchableOpacity onPress={onClick}>
          <View style={styles.doneBtn}>
            <Text style={styles.inputText}>
                설정 완료
            </Text>
          </View>
        </TouchableOpacity>
      </View>

	  <View style={styles.gotoback}>
        <TouchableOpacity onPress={() => {navigation.navigate("isLogin")}}>
          <View>
            <Text style={styles.inputText}>
				돌아가기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <Image  source={require('gomaoom/assets/greenBottom.png')}/>
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: '#FFFCF8',
        flex:1,
    },
    container: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
		marginTop: 70,
		marginBottom: 0,
		position: "relative"
        // backgroundColor:'skyblue',
    },
	gotoback:{
		flex : 0.4
	},
    desc:{
      fontSize:20,
      marginBottom:15,
    },
    btncontainer:{
      flex:1.5,
      justifyContent: 'center',
      alignItems:'center',
	  zIndex: 200,
    //   backgroundColor:'pink'
    },
    btn:{
      backgroundColor:'#F1F1F1',
      paddingHorizontal:10,
      paddingVertical:7,
      borderRadius:30,
      width:'50%',
      marginBottom:15,
    },
    inputText:{
      fontSize:20,
      textAlign:'center',
    },
    donecontainer:{
      flex:0.4,
      justifyContent: 'center',
      alignItems:'center',
	 alignContent: "center",
    },
    doneBtn:{
    //   marginTop:'-10%',
      backgroundColor:'#CCE0CC',
      paddingHorizontal:20,
      borderRadius:30,
      paddingVertical:15,
	  zIndex: -1,
    },
});
