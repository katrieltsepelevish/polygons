import { useShallow } from 'zustand/shallow';

import { usePolygonStore } from '../store/usePolygonStore';

const PolygonList = () => {
    const {
        polygons,
        isDeleting,
        deletingId,
        deletePolygon,
        handlePolygonBlink,
    } = usePolygonStore(
        useShallow((state) => ({
            polygons: state.polygons,
            isDeleting: state.isDeleting,
            deletingId: state.deletingId,
            deletePolygon: state.deletePolygon,
            handlePolygonBlink: state.handlePolygonBlink,
        })),
    );

    return (
        <ul className="divide-y divide-gray-100">
            {polygons.map((polygon) => {
                const isThisDeleting = isDeleting && deletingId === polygon.id;
                return (
                    <li
                        key={polygon.id}
                        className="flex items-center justify-between py-3"
                    >
                        <span
                            className="font-medium text-gray-800 truncate mr-2 cursor-pointer"
                            onClick={() => handlePolygonBlink(polygon.id)}
                        >
                            {polygon.name}
                        </span>
                        <button
                            onClick={() => deletePolygon(polygon.id)}
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed flex items-center"
                        >
                            {isThisDeleting && (
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            {isThisDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default PolygonList;
