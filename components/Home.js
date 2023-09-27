import { Button, StyleSheet, Text, View, Image } from 'react-native';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
          <Image source={require('gomaoom/assets/blueTop.png')}/>

            <Text style={styles.hello}>
                눈송이님, 안녕하세요!
            </Text>
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
