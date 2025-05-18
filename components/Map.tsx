import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';

export type MapHandles = {
  moveToUserLocation: () => void;
  moveToRegion: (region: Region) => void;
  fitToMarkers: () => void;
};

type QuadraType = 'society' | 'futsal' | 'gramado';

type MarkerData = {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  type?: QuadraType;
  available?: boolean;
};

type MapProps = {
  initialRegion?: Region;
  markers?: Array<MarkerData>;
  onMarkerPress?: (markerId: string) => void;
  showUserLocation?: boolean;
};

// Estilo personalizado para um mapa mais limpo, sem muitos pontos de interesse
const mapStyle = [
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }
];

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
  
  // Expose functions to parent components
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
    },
    moveToRegion: (region: Region) => {
      mapRef.current?.animateToRegion(region, 1000);
    },
    fitToMarkers: () => {
      if (markers.length > 0 && mapRef.current) {
        mapRef.current.fitToSuppliedMarkers(
          markers.map(marker => marker.id),
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          }
        );
      }
    }
  }));
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        
        if (showUserLocation) {
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg('Failed to get current location');
      }
    })();
  }, []);

  // Get marker color based on quadra type
  const getMarkerColor = (type?: QuadraType, available?: boolean) => {
    if (!available) return '#9CA3AF'; // Cinza para não disponível
    
    switch (type) {
      case 'society':
        return '#10B981'; // Verde
      case 'futsal':
        return '#3B82F6'; // Azul
      case 'gramado':
        return '#8B5CF6'; // Roxo
      default:
        return '#F59E0B'; // Laranja (padrão)
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        rotateEnabled={true}
        customMapStyle={mapStyle}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            identifier={marker.id}
            coordinate={marker.coordinate}
            tracksViewChanges={false}
            onPress={() => onMarkerPress && onMarkerPress(marker.id)}
          >
            <View style={[
              styles.customMarker,
              { backgroundColor: getMarkerColor(marker.type, marker.available) }
            ]}>
              <MapPin size={18} color="#FFFFFF" />
            </View>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text style={styles.calloutDescription}>{marker.description}</Text>
                {marker.type && (
                  <Text style={styles.calloutType}>
                    {marker.type === 'society' ? 'Society' : 
                     marker.type === 'futsal' ? 'Futsal' : 'Gramado'}
                  </Text>
                )}
                {marker.available !== undefined && (
                  <Text style={[
                    styles.calloutAvailability,
                    { color: marker.available ? '#10B981' : '#EF4444' }
                  ]}>
                    {marker.available ? 'Disponível' : 'Indisponível'}
                  </Text>
                )}
              </View>
            </Callout>
          </Marker>
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
  customMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutContainer: {
    width: 160,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#111827',
  },
  calloutDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  calloutType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 2,
  },
  calloutAvailability: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  }
});

export default Map;
