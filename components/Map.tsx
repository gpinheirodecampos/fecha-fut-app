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

// Estilo personalizado para um mapa mais limpo, sem pontos de interesse e estabelecimentos
const mapStyle = [
  // Ocultar todos os pontos de interesse
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Mostrar apenas parques de forma simplificada
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  // Ocultar rótulos de parques
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Ocultar pontos de trânsito (estações, pontos de ônibus, etc)
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Simplificar paisagens urbanas
  {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  // Simplificar rótulos de ruas
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  // Simplificar ou ocultar elementos de rodovias
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Manter apenas ruas principais visíveis
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  // Estilizar água para ser mais clara
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "lightness": 20
      }
    ]
  },
  // Simplificar nomes de localidades administrativas
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  // Ocultar estabelecimentos comerciais
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Ocultar pontos de serviço
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // Simplificar rótulos de estradas
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
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
    },    fitToMarkers: () => {
      if (markers.length === 0) {
        console.log("No markers to fit");
        
        // Se não temos marcadores mas temos a localização do usuário, centralizar lá
        if (location) {
          mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }, 500);
        }
        return;
      }
      
      try {
        // Abordagem manual para calcular a região que contém todos os marcadores
        const latitudes = markers.map(m => m.coordinate.latitude);
        const longitudes = markers.map(m => m.coordinate.longitude);
        
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLong = Math.min(...longitudes);
        const maxLong = Math.max(...longitudes);
        
        const midLat = (minLat + maxLat) / 2;
        const midLong = (minLong + maxLong) / 2;
        
        // Calcular delta para incluir todos os marcadores com margem
        const latDelta = Math.max(0.02, (maxLat - minLat) * 1.5);
        const longDelta = Math.max(0.02, (maxLong - minLong) * 1.5);
        
        const region = {
          latitude: midLat,
          longitude: midLong,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        };
        
        console.log("Animating to region:", region);
        
        // Animar para a região calculada
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 500);
        }
      } catch (error) {
        console.error("Error fitting to markers:", error);
      }
    }
  }));    // Função para centralizar no marcadores
    const centerOnMarkers = () => {
      if (markers.length === 0) return;
      
      try {
        const latitudes = markers.map(m => m.coordinate.latitude);
        const longitudes = markers.map(m => m.coordinate.longitude);
        
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLong = Math.min(...longitudes);
        const maxLong = Math.max(...longitudes);
        
        const midLat = (minLat + maxLat) / 2;
        const midLong = (minLong + maxLong) / 2;
        
        // Calcular delta para incluir todos os marcadores
        const latDelta = Math.max(0.02, (maxLat - minLat) * 1.5); // 50% de margem, mínimo de 0.02
        const longDelta = Math.max(0.02, (maxLong - minLong) * 1.5);
        
        const markersRegion = {
          latitude: midLat,
          longitude: midLong,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        };
        
        setRegion(markersRegion);
        
        // Aplicar região ao mapa com pequeno atraso para garantir que o componente está pronto
        setTimeout(() => {
          mapRef.current?.animateToRegion(markersRegion, 500);
        }, 300);
      } catch (error) {
        console.error("Error centering on markers:", error);
      }
    };

    // Efeito para obter localização e inicializar o mapa
    useEffect(() => {
      let isMounted = true; // Flag para evitar atualizações de estado após desmontagem
      
      (async () => {
        // Primeiro, tentamos centralizar nos marcadores se disponíveis
        if (markers.length > 0) {
          centerOnMarkers();
        }

        // Em paralelo, obtemos a localização do usuário
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let userLocation = await Location.getCurrentPositionAsync({});
          
          // Verificar se o componente ainda está montado
          if (isMounted) {
            setLocation(userLocation);
            
            // Se não temos marcadores, centralizamos na localização do usuário
            if (markers.length === 0 && showUserLocation) {
              const newRegion = {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(newRegion);
              
              // Aplicar região ao mapa com pequeno atraso
              setTimeout(() => {
                mapRef.current?.animateToRegion(newRegion, 500);
              }, 300);
            }
          }
        } catch (error) {
          console.error("Error getting location:", error);
          if (isMounted) {
            setErrorMsg('Failed to get current location');
          }
        }
      })();
      
      return () => {
        isMounted = false; // Limpar flag quando o componente desmonta
      };
    }, []);  // Usamos um ref para controlar a montagem inicial do componente
  const isInitialMount = useRef(true);
  const prevMarkersLength = useRef(markers.length);
  
  // Ajustamos a visualização quando os marcadores mudam
  useEffect(() => {
    // Na primeira montagem, já tratamos no outro useEffect
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevMarkersLength.current = markers.length;
      return;
    }
    
    // Verificar se realmente houve mudança no número de marcadores
    // para evitar ajustes desnecessários
    if (prevMarkersLength.current !== markers.length) {
      console.log("Markers count changed from", prevMarkersLength.current, "to", markers.length);
      prevMarkersLength.current = markers.length;
      
      // Delay para garantir que a UI foi atualizada
      setTimeout(() => {
        if (markers.length > 0) {
          // Usar nossa própria implementação ao invés de fitToSuppliedMarkers
          try {
            const latitudes = markers.map(m => m.coordinate.latitude);
            const longitudes = markers.map(m => m.coordinate.longitude);
            
            const minLat = Math.min(...latitudes);
            const maxLat = Math.max(...latitudes);
            const minLong = Math.min(...longitudes);
            const maxLong = Math.max(...longitudes);
            
            const midLat = (minLat + maxLat) / 2;
            const midLong = (minLong + maxLong) / 2;
            
            const latDelta = Math.max(0.02, (maxLat - minLat) * 1.5);
            const longDelta = Math.max(0.02, (maxLong - minLong) * 1.5);
            
            const region = {
              latitude: midLat,
              longitude: midLong,
              latitudeDelta: latDelta,
              longitudeDelta: longDelta,
            };
            
            if (mapRef.current) {
              mapRef.current.animateToRegion(region, 500);
            }
          } catch (error) {
            console.error("Error updating view for markers:", error);
          }
        }
      }, 300);
    }
  }, [markers]);

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
        pitchEnabled={false}
        customMapStyle={mapStyle}
        toolbarEnabled={false}
        zoomControlEnabled={false}
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
            </View>            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>
                  {marker.title || ''}
                </Text>
                <Text style={styles.calloutDescription}>
                  {marker.description || ''}
                </Text>
                {marker.type ? (
                  <Text style={styles.calloutType}>
                    {marker.type === 'society' ? 'Society' : 
                     marker.type === 'futsal' ? 'Futsal' : 
                     marker.type === 'gramado' ? 'Gramado' : ''}
                  </Text>
                ) : null}
                {marker.available !== undefined ? (
                  <Text style={[
                    styles.calloutAvailability,
                    { color: marker.available ? '#10B981' : '#EF4444' }
                  ]}>
                    {marker.available ? 'Disponível' : 'Indisponível'}
                  </Text>
                ) : null}
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
