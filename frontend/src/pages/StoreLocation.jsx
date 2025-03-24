import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Images from '../constants/imageConstant';
import CustomContainer from '../layouts/CustomContainer';
import Loader from '../components/Loader/Loader';

function StoreLocation() {
    const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const [selectedStore, setSelectedStore] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const stores = [
        { id: 1, name: "Mumbai", location: { lat: 19.0760, lng: 72.8777 } },
        { id: 2, name: "Delhi", location: { lat: 28.6139, lng: 77.2090 } },
        { id: 3, name: "Bengaluru", location: { lat: 12.9716, lng: 77.5946 } },
        { id: 4, name: "Kolkata", location: { lat: 22.5726, lng: 88.3639 } },
        { id: 5, name: "Chennai", location: { lat: 13.0827, lng: 80.2707 } },
        { id: 6, name: "Hyderabad", location: { lat: 17.3850, lng: 78.4867 } },
        { id: 7, name: "Pune", location: { lat: 18.5204, lng: 73.8567 } },
        { id: 8, name: "Ahmedabad", location: { lat: 23.0225, lng: 72.5714 } },
        { id: 9, name: "Jaipur", location: { lat: 26.9124, lng: 75.7873 } },
        { id: 10, name: "Chandigarh", location: { lat: 30.7333, lng: 76.7794 } },
        { id: 11, name: "Lucknow", location: { lat: 26.8467, lng: 80.9462 } },
        { id: 12, name: "Surat", location: { lat: 21.1702, lng: 72.8311 } },
        { id: 13, name: "Indore", location: { lat: 22.7196, lng: 75.8577 } },
    ];

    const markerIcon = new Icon({
        iconUrl: Images.NikeLocation,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
    });

    const userIcon = new Icon({
        iconUrl: Images.CurrentLocation,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
    });

    useEffect(() => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error fetching geolocation", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        setIsLoading(false);
    }, []);

    function CenterMapOnStore() {
        const map = useMap();

        useEffect(() => {
            if (selectedStore) {
                map.setView([selectedStore.location.lat, selectedStore.location.lng], 12);
            }
        }, [map]);

        return null;
    }

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <CustomContainer customClass={"xl:mx-20 lg:mx-12"}>
                    <div className="py-12">
                        <h1 className="section-heading">Find a Nike Store</h1>
                        <MapContainer
                            center={userLocation}
                            zoom={5}
                            className='w-full h-[400px] relative z-10'
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />

                            <Marker position={userLocation} icon={userIcon}>
                            </Marker>

                            {stores.map((store) => (
                                <Marker
                                    key={store.id}
                                    position={store.location}
                                    icon={markerIcon}
                                    eventHandlers={{
                                        click: () => setSelectedStore(store),
                                    }}
                                >
                                </Marker>
                            ))}
                            <CenterMapOnStore />
                        </MapContainer>
                    </div>
                </CustomContainer>
            }
        </>
    );
}

export default StoreLocation;
