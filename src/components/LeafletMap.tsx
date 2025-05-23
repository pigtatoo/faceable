import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function LeafletMap() {
    const markers = [
        { geocode: [1.3521, 103.8198], popUp: 'Nanyang Poly' },
        { geocode: [1.3631, 103.8354], popUp: 'Ang Mo Kio Hub' },
        ];

    
    return (

        
        <MapContainer
            center={[1.3521, 103.8198]}
            zoom={13}
            style={{ height: "100vh", width: "100%", borderRadius: "0.75rem", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <MarkerClusterGroup chunkedLoading >
            {markers.map(marker => (
                <Marker position ={marker.geocode} ><Popup><p>{marker.popUp}</p></Popup>
                </Marker>
            ))
            }</MarkerClusterGroup>

        </MapContainer>
    )
}