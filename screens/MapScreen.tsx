import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Map from '../components/Map';
import Colors from '../constants/Colors';

const sampleMarkers = [
  {
    id: '1',
    coordinate: {
      latitude: -22.9068,
      longitude: -43.1729,
    },
    title: 'Campo 1',
    description: 'Campo de futebol disponível',
  },
  {
    id: '2',
    coordinate: {
      latitude: -22.9168,
      longitude: -43.1829,
    },
    title: 'Campo 2',
    description: 'Quadra sintética',
  },
];

const MapScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(markerId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map 
          markers={sampleMarkers}
          onMarkerPress={handleMarkerPress}
        />
      </View>
      
      {selectedMarker && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>
            {sampleMarkers.find(m => m.id === selectedMarker)?.title}
          </Text>
          <Text style={styles.infoDescription}>
            {sampleMarkers.find(m => m.id === selectedMarker)?.description}
          </Text>
          <Button 
            title="Ver Detalhes"
            color={Colors.primary}
            onPress={() => console.log(`Visualizar quadra ${selectedMarker}`)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  infoPanel: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  }
});

export default MapScreen;
