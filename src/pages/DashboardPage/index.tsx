import { useState } from 'react';
import LeafletMap from '../../components/LeafletMap';

function DashboardPage() {
    // Move marker selection state here
    const [selectedMarker, setSelectedMarker] = useState<null | { geocode: number[]; popUp: string }>(null);
    return (
        <div className="h-screen w-screen flex flex-col">
            {/* Main content area below navbar */}
            <div className="flex flex-row flex-1 pt-[70px] h-full">
                {/* Sidebar on the left, relatively positioned so it takes up space */}
                {selectedMarker && (
                    <div className="h-full w-80 bg-white shadow-lg z-40 p-6 flex flex-col border-r border-gray-200 animate-slidein">
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
                {/* Map area fills all space beside sidebar, below navbar */}
                <div className="flex-1 h-full">
                    <LeafletMap setSelectedMarker={setSelectedMarker} />
                </div>
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