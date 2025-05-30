import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const redIcon = new L.Icon({
    iconUrl: "/marker_red.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
const greenIcon = new L.Icon({
    iconUrl: "/marker_green.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
const yellowIcon = new L.Icon({
    iconUrl: "/marker_yellow.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Remove unused selectedMarker prop
export default function LeafletMap({ setSelectedMarker }: {
    setSelectedMarker: (marker: { geocode: number[]; popUp: string } | null) => void;
}) {
    const markers = [
        { geocode: [1.3521, 103.8198], popUp: 'Nanyang Poly' },
        { geocode: [1.3631, 103.8354], popUp: 'Ang Mo Kio Hub' },
        { geocode: [1.2831, 103.8607], popUp: 'Marina Bay Sands' }, // MBS marker
    ];

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={[1.3521, 103.8198]}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "0.75rem", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup chunkedLoading>
                    {markers.map((marker, idx) => (
                        <Marker
                            key={idx}
                            position={marker.geocode as [number, number]}
                            icon={
                                marker.popUp === 'Nanyang Poly' ? redIcon :
                                marker.popUp === 'Ang Mo Kio Hub' ? greenIcon :
                                marker.popUp === 'Marina Bay Sands' ? yellowIcon :
                                undefined
                            }
                            eventHandlers={{
                                click: () => setSelectedMarker(marker),
                            }}
                        >
                            <Popup><p>{marker.popUp}</p></Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            <style>{`
                @keyframes slidein {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slidein {
                    animation: slidein 0.3s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </div>
    );
}