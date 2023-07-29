import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

export default function App() {
  const loginNaver=()=>{
    console.log('네이버로그인..');
  };
  const loginKakao=()=>{
    console.log('카카오로그인..');
  };
  return (
    <View style={styles.background}>
      <Image source={require('gomaoom/assets/blueTop.png')}/>
      <View style={styles.container}>
        <Image source={require('gomaoom/assets/fakeLogo.png')}/>
        <Text style={styles.desc}>
          감성글 한두줄. 예를들면, 사랑하는 이에게 마음을 보내봐요. 사랑하는 이의 편지를 움켜쥐어봐요
        </Text>
        <View style={styles.btnContainer}>
        <TouchableOpacity onPress={loginNaver}>
          <View style={{marginBottom:20,...styles.loginBtn}}>
              <Text style={{
                fontSize:30,
              }}>
                네이버 로그인
              </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginKakao}>
          <View style={styles.loginBtn}>
              <Text style={{
                fontSize:30,
              }}>
                카카오 로그인
              </Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>
      <StatusBar style="auto" />
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Image  source={require('gomaoom/assets/greenBottom.png')}/>
      </View>

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
  desc:{
    fontSize:25,
    marginTop:30,
    marginHorizontal:30,
  },
  btnContainer:{
    // flexDirection:'column',
    // justifyContent:'flex-end',
    marginTop:110,
    // backgroundColor:'pink',
  },
  loginBtn:{
    backgroundColor:'#F1F1F1',
    paddingHorizontal:30,
    paddingVertical:7,
    borderRadius:20,
  },
});
