import { Constants } from 'expo';
import kmlData from '../AllowedArea.json';

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

export const INF = 1000000000000;

export const InitialRegion = { 
                                latitude: 32.0852999,
                                longitude: 34.7817676,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            };

export const InitialLatLonArray = [{ latitude: 0, longitude: 0 }];

export const initialState = { 
                            region: InitialRegion,
                            listOfLatLng: InitialLatLonArray,
                            pickedPlace: {},
                            firstAdded: true,
                            checkDistance: false
                        };
              
//Get the lon,lat from the file.
export const AllowedArea = () => {
    const data = kmlData.Document.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates;
    let dataArray = [];
    let longitude = '';
    let latitude = '';
    let islon = true;
       
    //Loop on file and expend the coordinates.
    for (let i = 0; i < data.length; i++) { 
        if (data[i] === ',' && data[i + 1] === '0' && data[i + 2] === ' ') {
            dataArray.push({ longitude: Number(longitude), latitude: Number(latitude) });
            longitude = '';
            latitude = '';
            islon = true;
            i += 2;
        } else if (data[i] === ',') {
           islon = false;
        } else if (islon) {
            longitude += data[i];
        } else {
            latitude += data[i];
        } 
    }
                        
    return dataArray;
};
