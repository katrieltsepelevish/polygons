import { usePolygonStore } from '../store/usePolygonStore';
import PolygonList from './PolygonList';

const Sidebar = () => {
    const polygons = usePolygonStore((state) => state.polygons);
    const isFetching = usePolygonStore((state) => state.isFetching);

    return (
        <aside className="w-[300px] p-5 border-r border-gray-300 flex flex-col h-full bg-white relative">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Polygons</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isFetching ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600"></div>
                    </div>
                ) : polygons.length === 0 ? (
                    <div className="text-gray-400">No polygons saved yet.</div>
                ) : (
                    <PolygonList />
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
