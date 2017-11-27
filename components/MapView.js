import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';

import ButtonView from '../components/ButtonView';
import { AllowedArea, initialState, InitialRegion, INF } from '../constants';

class MapLayout extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    //Set to default AllowedArea.
    onSetDefault = () => {
        this.setState({
                        region: InitialRegion,
                        listOfLatLng: AllowedArea(),
                        pickedPlace: {},
                        firstAdded: false,
                        checkDistance: true,
        });
        this.props.onDistanceCalculated('');
    }

    //If pick mode add point to list, else calculate distance.
    onAddedPoint = (pickedPlace) => {
        if (!this.state.checkDistance) {
            if (!this.state.firstAdded) {
                this.setState({ pickedPlace,
                                listOfLatLng: this.state.listOfLatLng.concat(pickedPlace) 
                            });
            } else {
                this.setState({ pickedPlace, listOfLatLng: [pickedPlace], firstAdded: false });
            } 
        } else {
            this.setState({ pickedPlace });
            this.calcDistance();
        }
    }

    //Calculate distance from the placed dot to the polygone.
    calcDistance = () => {
        const { listOfLatLng, pickedPlace } = this.state;

        if (listOfLatLng.length > 2) {
            const R = 6371;
            let minDistance = INF;
    
            //Taken from https://www.movable-type.co.uk/scripts/latlong.html
            // φ is latitude, λ is longitude, R is earth radius     
            for (let i = 0; i < listOfLatLng.length; i++) {
                const A1 = listOfLatLng[i].longitude;
                const A2 = listOfLatLng[i].latitude;
                const B1 = listOfLatLng[(i + 1) % listOfLatLng.length].longitude;
                const B2 = listOfLatLng[(i + 1) % listOfLatLng.length].latitude;
                const C1 = pickedPlace.longitude;
                const C2 = pickedPlace.latitude;
            
                // bearingAC = atan2( sin(Δλ)*cos(φ₂), cos(φ₁)*sin(φ₂) − sin(φ₁)*cos(φ₂)*cos(Δλ) )
                const x = Math.sin(C1 - A1) * 
                          Math.cos(C2);
                const y = Math.cos(A2) * Math.sin(C2) -  
                          Math.sin(A2) * Math.cos(C2) *
                          Math.cos(C1 - A1);
                let bearingAC = this.degreesToRadians(Math.atan2(x, y));
                bearingAC = 360 - ((bearingAB + 360) % 360); 

                // bearingAB = atan2( sin(Δλ)*cos(φ₂), cos(φ₁)*sin(φ₂) − sin(φ₁)*cos(φ₂)*cos(Δλ) ) 
                const x2 = Math.sin(B1 - A1) * 
                           Math.cos(B2);
                const y2 = Math.cos(A2) * Math.sin(B2) -
                           Math.sin(A2) * Math.cos(B2) *
                           Math.cos(B1 - A1);
                let bearingAB = this.degreesToRadians(Math.atan2(x2, y2)); 
                bearingAB = 360 - ((bearingAB + 360) % 360); 
                
                // distanceAC = acos( sin(φ₁)*sin(φ₂) + cos(φ₁)*cos(φ₂)*cos(Δλ) )*R
                const x3 = Math.sin(this.degreesToRadians(A2)) *
                           Math.sin(this.degreesToRadians(C2)) +
                           Math.cos(this.degreesToRadians(A2)) *
                           Math.cos(this.degreesToRadians(C2)) *
                           Math.cos(this.degreesToRadians(C1 - A1));
                const distanceAC = Math.acos(x3) * R;

                // distance = asin(sin(distanceAC/ R) * sin(bearingAC − bearingAB)) * R
                const x4 = Math.sin(distanceAC / R);
                const y4 = Math.sin(bearingAC - bearingAB);
                const distance = Math.asin(x4 * y4) * R;
    
                console.log(distance);

                if (distance < minDistance) {
                    minDistance = distance;
                }
            }

            //Send Message to mainScreen to change AnsweView text.
            if (minDistance !== INF) {
                this.props.onDistanceCalculated((Math.abs(minDistance)).toString());
            }
        } else {
            this.props.onDistanceCalculated('יש ליצור תחילה מצולע');
        }
    }

    degreesToRadians = (degrees) => {
        return (degrees * Math.PI) / 180;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ButtonView 
                    checkDistance={this.state.checkDistance}
                    onClear={() => this.setState(initialState)}
                    onSetDefault={this.onSetDefault.bind(this)}
                    onCheckDistance={() => this.setState({ checkDistance: (!this.state.checkDistance) })}
                />

                <MapView 
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChange={(region) => this.setState({ region })}
                    onPress={(coordinates) => this.onAddedPoint(coordinates.nativeEvent.coordinate)}
                >
                    <MapView.Polygon
                        coordinates={this.state.listOfLatLng}
                        strokeWidth={2}
                        fillColor='rgba(204,24,30,0.5)'
                        onPress={() => this.props.onDistanceCalculated('אתה בתוך המצולע')}
                    />
                </MapView>
            </View>
        );
    }
}

export default MapLayout;
