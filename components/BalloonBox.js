import React from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import Balloon from 'react-native-balloon';
const BalloonBox = ({ content }) => {
  return (
    <View style={styles.balloon}>
      <Balloon
          borderColor="#3B628C"
          backgroundColor="#3B628C"
          borderWidth={2}
          borderRadius={15}
          triangleDirection='left'
          triangleSize={10}
          width={250}
        >
          <Text style={styles.text}>{content}</Text>
      </Balloon>
    </View>
  );
};

const styles = StyleSheet.create({
  balloon: {
    alignSelf: 'flex-start', // 말풍선이 왼쪽으로 정렬되도록 설정
    width:'100%',
  },
  text: {
    padding:5,
    color: 'white',
    fontWeight:'bold',
    fontSize: 20,
  },
  
});

export default BalloonBox;
