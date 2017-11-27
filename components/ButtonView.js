import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const ButtonView = ({ onClear, onSetDefault, onCheckDistance, checkDistance }) => {
    return (
        <View style={styles.buttonViewStyle}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => onCheckDistance()}>
                <Text style={styles.TextStyle} >
                 {!checkDistance ? 'מרחק ממצולע' : 'הנח נק במפה'} 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={() => onSetDefault()}>
                <Text style={styles.TextStyle}> Allowed Area </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={() => onClear()}>
                <Text style={styles.TextStyle}> נקה </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    buttonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2196F3'
    },
    buttonStyle: {
        backgroundColor: '#cc181e',
        margin: 1,
        width: 120,
        height: 20
    },
    TextStyle: {
        textAlign: 'center',
        color: '#fff'
    }
};

export default ButtonView;
