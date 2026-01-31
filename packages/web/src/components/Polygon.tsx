import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-konva';

interface PolygonProps {
    points: [number, number][];
    blink?: boolean;
    color?: string;
}

const Polygon = ({ points, blink, color = 'blue' }: PolygonProps) => {
    const [isBlinkingVisible, setIsBlinkingVisible] = useState(false);
    const intervalRef = useRef<number | undefined>(undefined);
    const blinkCountRef = useRef(0);

    const getRgba = (opacity: number) => {
        return color === 'red'
            ? `rgba(239, 68, 68, ${opacity})`
            : `rgba(0, 0, 255, ${opacity})`;
    };

    useEffect(() => {
        if (blink) {
            blinkCountRef.current = 0;
            setIsBlinkingVisible(true);

            intervalRef.current = window.setInterval(() => {
                setIsBlinkingVisible((prev) => !prev);
                blinkCountRef.current += 1;

                // 3 times visible, 3 times dim
                if (blinkCountRef.current >= 6) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = undefined;
                    }
                    setIsBlinkingVisible(false);
                }
            }, 250);
        } else {
            setIsBlinkingVisible(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        };
    }, [blink]);

    return (
        <Line
            points={points.flat()}
            stroke={color === 'red' ? '#ef4444' : 'blue'}
            strokeWidth={2}
            fill={isBlinkingVisible ? getRgba(0.4) : getRgba(0.1)}
            closed={true}
        />
    );
};

export default Polygon;
