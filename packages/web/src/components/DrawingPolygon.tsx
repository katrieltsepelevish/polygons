import { useMemo } from 'react';
import { Circle, Line } from 'react-konva';

interface DrawingPolygonProps {
    points: [number, number][];
    curMousePos: { x: number; y: number } | null;
    isDone?: boolean;
    onStartPointMouseOver: () => void;
    onStartPointMouseOut: () => void;
}

const DrawingPolygon = ({
    points,
    curMousePos,
    isDone,
    onStartPointMouseOver,
    onStartPointMouseOut,
}: DrawingPolygonProps) => {
    const pointsWithMouse = useMemo(() => {
        const flattened = points.flat();
        if (isDone || flattened.length === 0 || !curMousePos) return flattened;
        return [...flattened, curMousePos.x, curMousePos.y];
    }, [points, curMousePos, isDone]);

    if (points.length === 0) return null;

    return (
        <>
            <Line
                points={pointsWithMouse}
                stroke="#ef4444"
                strokeWidth={2}
                lineCap="round"
                lineJoin="round"
                closed={isDone}
                fill={isDone ? 'rgba(239, 68, 68, 0.2)' : undefined}
            />
            {!isDone && (
                <Circle
                    x={points[0][0]}
                    y={points[0][1]}
                    radius={6}
                    fill="red"
                    onMouseOver={onStartPointMouseOver}
                    onMouseOut={onStartPointMouseOut}
                />
            )}
        </>
    );
};

export default DrawingPolygon;
