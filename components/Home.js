import { Button, StyleSheet, Text, View } from 'react-native';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>
                눈송이님, 안녕하세요!
            </Text>
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
    
    
});
