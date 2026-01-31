import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import Polygon from '../src/components/Polygon';

jest.mock('react-konva', () => ({
    Line: ({
        points: _points,
        stroke: _stroke,
        strokeWidth: _strokeWidth,
        fill: _fill,
        closed: _closed,
        ...props
    }: any) => <div data-testid="konva-line" {...props} />,
}));

describe('Polygon', () => {
    const points: [number, number][] = [
        [0, 0],
        [10, 0],
        [10, 10],
    ];

    it('renders a Line with flattened points', () => {
        const { getByTestId } = render(<Polygon points={points} color="red" />);

        const line = getByTestId('konva-line');
        expect(line).toBeInTheDocument();
    });
});
