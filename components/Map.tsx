import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Dimensions, Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export type MapHandles = {
  moveToUserLocation: () => void;
};

type MapProps = {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers?: Array<{
    id: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title?: string;
    description?: string;
  }>;
  onMarkerPress?: (markerId: string) => void;
  showUserLocation?: boolean;
};

const Map = forwardRef<MapHandles, MapProps>(({ 
  initialRegion = {
    latitude: -22.9068,  // Default to Rio de Janeiro, Brazil
    longitude: -43.1729,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  markers = [],
  onMarkerPress,
  showUserLocation = true
}, ref) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>(initialRegion);
  
  const mapRef = useRef<MapView>(null);
  
  // Expose the moveToUserLocation function to parent components
  useImperativeHandle(ref, () => ({
    moveToUserLocation: () => {
      if (location) {
        mapRef.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    }
  }));
  
  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        
        // Update map region with user's location
        if (showUserLocation) {
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          
          // Animate to user's location
          mapRef.current?.animateToRegion(newRegion, 1000);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg('Failed to get current location');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => onMarkerPress && onMarkerPress(marker.id)}
          />
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default Map;
