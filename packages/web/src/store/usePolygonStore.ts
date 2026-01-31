import axios from 'axios';
import { create } from 'zustand';

import type { Polygon } from '../types/polygon';

interface PolygonState {
    polygons: Polygon[];
    isFetching: boolean;
    isSaving: boolean;
    isDeleting: boolean;
    deletingId: string | null;
    pendingPoints: [number, number][];
    blinkingPolygonId: string | null;

    // Actions
    fetchPolygons: () => Promise<void>;
    savePolygon: (name: string) => Promise<Polygon>;
    deletePolygon: (id: string) => Promise<void>;
    addPendingPoint: (point: [number, number]) => void;
    setBlinkingPolygonId: (id: string | null) => void;
    handlePolygonBlink: (id: string) => void;
    resetPendingPoints: () => void;
}

export const usePolygonStore = create<PolygonState>((set, get) => ({
    polygons: [],
    isFetching: false,
    isSaving: false,
    isDeleting: false,
    deletingId: null,
    pendingPoints: [],
    blinkingPolygonId: null,

    fetchPolygons: async () => {
        set({ isFetching: true });
        try {
            const response = await axios.get('/api/polygons');
            set({ polygons: response.data });
        } catch (error) {
            console.error('Failed to fetch polygons:', error);
        } finally {
            set({ isFetching: false });
        }
    },

    savePolygon: async (name: string) => {
        const { pendingPoints } = get();
        if (pendingPoints.length === 0) throw new Error('No points to save');

        set({ isSaving: true });
        try {
            const response = await axios.post('/api/polygons', {
                name,
                points: pendingPoints,
            });
            const newPolygon = response.data;
            set((state) => ({
                polygons: [newPolygon, ...state.polygons],
                pendingPoints: [],
            }));
            return newPolygon;
        } catch (error) {
            console.error('Failed to save polygon:', error);
            throw error;
        } finally {
            set({ isSaving: false });
        }
    },

    deletePolygon: async (id: string) => {
        set({ isDeleting: true, deletingId: id });
        try {
            await axios.delete(`/api/polygons/${id}`);
            set((state) => ({
                polygons: state.polygons.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error('Failed to delete polygon:', error);
            throw error;
        } finally {
            set({ isDeleting: false, deletingId: null });
        }
    },

    addPendingPoint: (point) =>
        set((state) => ({ pendingPoints: [...state.pendingPoints, point] })),
    setBlinkingPolygonId: (id) => set({ blinkingPolygonId: id }),

    handlePolygonBlink: (id) => {
        set({ blinkingPolygonId: null });
        // Ensure state reset is processed before setting back the same ID
        requestAnimationFrame(() => {
            set({ blinkingPolygonId: id });
        });
    },

    resetPendingPoints: () => {
        set({ pendingPoints: [] });
    },
}));
