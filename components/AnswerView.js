import React from 'react';
import { View, Text } from 'react-native';

const AnswerView = ({ text }) => {
    return (
        <View style={styles.descText}>
            <Text style={styles.textStyle}> הוראות:</Text>
            <Text style={styles.textStyle}> לחץ על Allowed Area כדי לטעון אותו על המפע</Text>
            <Text style={styles.textStyle}> בחר נקודות על המפה בכדי ליצור מצולע בעצמך</Text>
            <Text style={styles.textStyle}>{ text }</Text>
        </View>
    );
};

const styles = {
    descText: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff'
    }
};

export default AnswerView;
