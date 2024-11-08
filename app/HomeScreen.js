import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

async function cleanseDataArray(dataArray) {
    return dataArray.filter(entry => {
        const hasValidCoordinates = entry.latitude !== 0 && entry.longitude !== 0;
        const hasFormattedAddressOrPlaceID = entry.formattedAddress || entry.placeID;
        return hasValidCoordinates && hasFormattedAddressOrPlaceID;
    });
}


const HomeScreen = () => {
    const { logout } = useAuth();
    const [error, setError] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { accessToken, refreshAccessToken } = useAuth();

    const initialRegion = {
        latitude: 37.789383,
        longitude: -122.411784,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.181:8080/locations', { headers: { "Authorization": `Bearer ${accessToken}` } })
                if (!response.data) {
                    setLoading(false);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setLocations(await cleanseDataArray(response.data));
                setLoading(false);
            } catch (err) {
                refreshAccessToken()
                setError(err.message);
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [accessToken])

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                provider="google"
            >
                {locations.map(({ latitude, longitude, placeID, formattedAddress }, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude,
                            longitude,
                        }}
                        title={placeID ? `Place Id: ${placeID}` : ' '}
                        description={formattedAddress && `Name: ${formattedAddress}`}
                    />
                ))}
            </MapView>
            <Button title="Logout" onPress={logout} style={styles.logoutButton} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    logoutButton: {
        position: 'absolute', bottom: 20, left: 20, right: 20,
    },
});

export default HomeScreen;
