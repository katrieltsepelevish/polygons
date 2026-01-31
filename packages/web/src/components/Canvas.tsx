import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useShallow } from 'zustand/shallow';

import { usePolygonStore } from '../store/usePolygonStore';
import DrawingPolygon from './DrawingPolygon';
import Polygon from './Polygon';
import SavePolygonModal from './SavePolygonModal';

const SIDEBAR_WIDTH = 300;
const BACKGROUND_URL = 'https://picsum.photos/1920/1080';

const Canvas = () => {
    const {
        polygons,
        pendingPoints,
        blinkingPolygonId,
        addPendingPoint,
        resetPendingPoints,
    } = usePolygonStore(
        useShallow((state) => ({
            polygons: state.polygons,
            pendingPoints: state.pendingPoints,
            blinkingPolygonId: state.blinkingPolygonId,
            addPendingPoint: state.addPendingPoint,
            resetPendingPoints: state.resetPendingPoints,
        })),
    );

    const [curMousePos, setCurMousePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image] = useImage(BACKGROUND_URL);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth - SIDEBAR_WIDTH,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth - SIDEBAR_WIDTH,
                height: window.innerHeight,
            });
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isModalOpen) {
                    setIsModalOpen(false);
                } else {
                    resetPendingPoints();
                }
                setIsMouseOverStartPoint(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen, resetPendingPoints]);

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (isModalOpen) return;

        const stage = e.target.getStage();
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;

        if (isMouseOverStartPoint && pendingPoints.length >= 3) {
            setIsModalOpen(true);
            setIsMouseOverStartPoint(false);
            return;
        }

        addPendingPoint([pos.x, pos.y]);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage) {
            setCurMousePos(stage.getPointerPosition());
        }
    };

    return (
        <>
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                onClick={handleStageClick}
                onMouseMove={handleMouseMove}
                style={{ cursor: 'pointer' }}
            >
                <Layer>
                    {image && (
                        <KonvaImage
                            image={image}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    )}

                    {polygons.map((poly) => (
                        <Polygon
                            key={poly.id}
                            points={poly.points}
                            blink={poly.id === blinkingPolygonId}
                        />
                    ))}

                    <DrawingPolygon
                        points={pendingPoints}
                        curMousePos={isModalOpen ? null : curMousePos}
                        isDone={isModalOpen}
                        onStartPointMouseOver={() =>
                            setIsMouseOverStartPoint(true)
                        }
                        onStartPointMouseOut={() =>
                            setIsMouseOverStartPoint(false)
                        }
                    />
                </Layer>
            </Stage>

            <SavePolygonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Canvas;
