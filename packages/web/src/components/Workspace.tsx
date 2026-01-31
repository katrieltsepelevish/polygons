import { useEffect } from 'react';

import { usePolygonStore } from '../store/usePolygonStore';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const Workspace = () => {
    const fetchPolygons = usePolygonStore((state) => state.fetchPolygons);

    useEffect(() => {
        fetchPolygons();
    }, [fetchPolygons]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 relative bg-gray-100">
                <Canvas />
            </main>
        </div>
    );
};

export default Workspace;
