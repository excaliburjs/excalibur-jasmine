type ImageVisual = HTMLCanvasElement | CanvasRenderingContext2D | HTMLImageElement | string;
declare const convertSourceVisualToImageData: (visual: ImageVisual) => Promise<ImageData>;
export { convertSourceVisualToImageData, ImageVisual };
