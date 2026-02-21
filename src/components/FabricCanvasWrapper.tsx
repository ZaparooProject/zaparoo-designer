import { useRef, useEffect, useTransition } from 'react';
import { StaticCanvas } from 'fabric';

type WrapperProp = {
  setFabricCanvas: (canvas: StaticCanvas | null) => void;
};

const uiid = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `uuid-${Date.now().toString(16)}-${Math.random()
    .toString(16)
    .slice(2)}`;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target.id = uiid();
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
