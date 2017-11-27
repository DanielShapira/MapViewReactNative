import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import MapLayout from '../components/MapView';
import AnswerView from '../components/AnswerView';
import { STATUS_BAR_HEIGHT } from '../constants';

class MainScreen extends Component {
    //Style to navigation bar
    static navigationOptions = () => ({
        title: 'Polygon creator',
        headerStyle: {
            height: Platform.OS === 'android' ? 30 + STATUS_BAR_HEIGHT : 30,
            backgroundColor: '#2196F3',
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
            color: '#fff',
            alignSelf: 'center'
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapLayout onDistanceCalculated={(text) => this.setState({ text })} />
                <AnswerView text={this.state.text} />
            </View>
        );
    }
}

export default MainScreen;
