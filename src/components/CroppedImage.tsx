import {grey} from '@mui/material/colors';
import {CSSProperties} from 'react';
import {useRef, useEffect} from 'react';

export interface CroppedImageProps {
  src: string;
  alt: string;
  offsetX: number;
  offsetY: number;
  cropWidth: number;
  cropHeight: number;
  width: number;
  height: number;
  style?: CSSProperties;
};

export function CroppedImage(props: CroppedImageProps) {
  const myCanvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = myCanvas.current!.getContext('2d')!;
    context.fillStyle = grey['200'];
    context.fillRect(0, 0, props.width, props.height);
    const image = new Image();
    image.src = props.src;
    image.alt = props.alt;
    image.onload = () => {
      context.drawImage(
        image, props.offsetX, props.offsetY, props.cropWidth, props.cropHeight,
        0, 0, props.width, props.height);
    }
  });

  return (
    <canvas ref={myCanvas} width={props.width} height={props.height}
      style={props.style} />
  );
};
