import { useRef, useEffect, useTransition } from 'react';
import { StaticCanvas } from 'fabric';
import { createFabricObjectId } from '../utils/createFabricObjectId';

type WrapperProp = {
  setFabricCanvas: (canvas: StaticCanvas | null) => void;
};

export const FabricCanvasWrapper = ({ setFabricCanvas }: WrapperProp) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new StaticCanvas(canvasRef.current!, {
        renderOnAddRemove: false,
        backgroundColor: 'white',
        enableRetinaScaling: false,
      });
      fabricCanvas.on('object:added', ({ target }) => {
        if (!target || target.id) {
          return;
        }
        target.id = createFabricObjectId();
      });
      startTransition(() => {
        setFabricCanvas(fabricCanvas);
      });
      return () => {
        if (fabricCanvas) {
          fabricCanvas.dispose();
        }
      };
    }
  }, [setFabricCanvas]);

  return <canvas ref={canvasRef} />;
};
