import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import DrawingPolygon from '../src/components/DrawingPolygon';

jest.mock('react-konva', () => ({
    Line: ({
        points: _points,
        stroke: _stroke,
        strokeWidth: _strokeWidth,
        lineCap: _lineCap,
        lineJoin: _lineJoin,
        fill: _fill,
        closed: _closed,
        ...props
    }: any) => <div data-testid="konva-line" {...props} />,
    Circle: ({
        x: _x,
        y: _y,
        radius: _radius,
        fill: _fill,
        onMouseOver: _onMouseOver,
        onMouseOut: _onMouseOut,
        ...props
    }: any) => <div data-testid="konva-circle" {...props} />,
}));

describe('DrawingPolygon', () => {
    const mockOnStartPointMouseOver = jest.fn();
    const mockOnStartPointMouseOut = jest.fn();
    const points: [number, number][] = [
        [0, 0],
        [10, 10],
    ];

    it('renders a Line and a Circle when points are provided', () => {
        const { getByTestId } = render(
            <DrawingPolygon
                points={points}
                curMousePos={{ x: 20, y: 20 }}
                onStartPointMouseOver={mockOnStartPointMouseOver}
                onStartPointMouseOut={mockOnStartPointMouseOut}
            />,
        );

        expect(getByTestId('konva-line')).toBeInTheDocument();
        expect(getByTestId('konva-circle')).toBeInTheDocument();
    });

    it('returns null when no points are provided', () => {
        const { queryByTestId } = render(
            <DrawingPolygon
                points={[]}
                curMousePos={{ x: 20, y: 20 }}
                onStartPointMouseOver={mockOnStartPointMouseOver}
                onStartPointMouseOut={mockOnStartPointMouseOut}
            />,
        );

        expect(queryByTestId('konva-line')).not.toBeInTheDocument();
    });
});
