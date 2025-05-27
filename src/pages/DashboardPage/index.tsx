import { useState } from 'react';
import LeafletMap from '../../components/LeafletMap';
import Navbar from '../../components/Navbar';

function DashboardPage() {
    // Move marker selection state here
    const [selectedMarker, setSelectedMarker] = useState<null | { geocode: number[]; popUp: string }>(null);
    return (
         <div className="h-screen w-screen flex flex-row">
            {/* Sidebar on the left */}
            {selectedMarker && (
                <div className="fixed top-[70px] left-0 h-[calc(100vh-70px)] w-80 bg-white shadow-lg z-[60] p-6 flex flex-col border-r border-gray-200 animate-slidein">
                    <button
                        className="self-end text-gray-500 hover:text-gray-800 mb-4"
                        onClick={() => setSelectedMarker(null)}
                        aria-label="Close sidebar"
                    >
                        ×
                    </button>
                    <h2 className="text-xl font-semibold mb-2">Location Info</h2>
                    <div className="mb-2">
                        <strong>Name:</strong> {selectedMarker.popUp}
                    </div>
                    <div>
                        <strong>Coordinates:</strong> {selectedMarker.geocode[0]}, {selectedMarker.geocode[1]}
                    </div>
                    <div>
                        <strong>SKUs:</strong>
                    </div>
                </div>
            )}
            {/* Sticky/fixed Navbar with proper z-index */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Navbar alwaysShow />
            </div>
            {/* Map area fills all space below navbar, no gap */}
            <div className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)]">
                <LeafletMap setSelectedMarker={setSelectedMarker} />
            </div>
            <style>{`
                @keyframes slidein {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slidein {
                    animation: slidein 0.3s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </div>
    );
}

export default DashboardPage;