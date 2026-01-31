import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { usePolygonStore } from '../store/usePolygonStore';

interface SavePolygonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SavePolygonModal = ({ isOpen, onClose }: SavePolygonModalProps) => {
    const { isSaving, savePolygon, resetPendingPoints } = usePolygonStore(
        useShallow((state) => ({
            isSaving: state.isSaving,
            savePolygon: state.savePolygon,
            resetPendingPoints: state.resetPendingPoints,
        })),
    );
    const [name, setName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = async () => {
        if (name.trim() && !isSaving) {
            await savePolygon(name.trim());
            onClose();
        }
    };

    const handleCancel = () => {
        resetPendingPoints();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-xl font-bold mb-4">Save Polygon</h2>
                <div className="mb-4">
                    <label
                        htmlFor="polygon-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Polygon Name
                    </label>
                    <input
                        id="polygon-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSaving}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors disabled:bg-gray-50"
                        placeholder="Enter name..."
                        autoFocus
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!name.trim() || isSaving}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center min-w-[80px]"
                    >
                        {isSaving ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavePolygonModal;
