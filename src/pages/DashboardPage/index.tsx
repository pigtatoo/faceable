import React from 'react';
import LeafletMap from '../../components/LeafletMap';
import Navbar from '../../components/Navbar';

function DashboardPage() {

    return (
         <div className="h-screen w-screen">
            {/* Sticky/fixed Navbar with proper z-index */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Navbar />
            </div>
            {/* Map area with enough top padding so it's not hidden behind the Navbar */}
            <div className="pt-[70px] h-[calc(100vh-70px)] w-full">
                <LeafletMap />
            </div>
        </div>
    );

}

export default DashboardPage;