import React from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';

const BalloonBox = ({ content }) => {
  return (
    <View style={styles.balloon}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balloon: {
    backgroundColor: '#7FB17F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7FB17F',
    alignSelf: 'flex-start', // 말풍선이 왼쪽으로 정렬되도록 설정
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default BalloonBox;
