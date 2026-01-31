import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import PolygonList from '../src/components/PolygonList';
import { usePolygonStore } from '../src/store/usePolygonStore';

// Mock the store
jest.mock('../src/store/usePolygonStore');

const mockPolygons = [
    {
        id: '1',
        name: 'Polygon 1',
        points: [
            [0, 0],
            [10, 0],
            [10, 10],
        ],
    },
    {
        id: '2',
        name: 'Polygon 2',
        points: [
            [20, 20],
            [30, 20],
            [30, 30],
        ],
    },
];

describe('PolygonList', () => {
    const mockDeletePolygon = jest.fn();
    const mockHandlePolygonBlink = jest.fn();

    beforeEach(() => {
        (usePolygonStore as unknown as jest.Mock).mockReturnValue({
            polygons: mockPolygons,
            isDeleting: false,
            deletingId: null,
            deletePolygon: mockDeletePolygon,
            handlePolygonBlink: mockHandlePolygonBlink,
        });
    });

    it('renders a list of polygons', () => {
        render(<PolygonList />);

        expect(screen.getByText('Polygon 1')).toBeInTheDocument();
        expect(screen.getByText('Polygon 2')).toBeInTheDocument();
    });

    it('calls handlePolygonBlink when a polygon name is clicked', () => {
        render(<PolygonList />);

        fireEvent.click(screen.getByText('Polygon 1'));
        expect(mockHandlePolygonBlink).toHaveBeenCalledWith('1');
    });

    it('calls deletePolygon when the delete button is clicked', () => {
        render(<PolygonList />);

        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(mockDeletePolygon).toHaveBeenCalledWith('1');
    });

    it('disables the delete button when isDeleting is true for that polygon', () => {
        (usePolygonStore as unknown as jest.Mock).mockReturnValue({
            polygons: mockPolygons,
            isDeleting: true,
            deletingId: '1',
            deletePolygon: mockDeletePolygon,
            handlePolygonBlink: mockHandlePolygonBlink,
        });

        render(<PolygonList />);

        const deleteButtons = screen.getAllByRole('button');
        expect(deleteButtons[0]).toBeDisabled();
        expect(screen.getByText('Deleting...')).toBeInTheDocument();
    });
});
