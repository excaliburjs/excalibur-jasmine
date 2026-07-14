import { convertSourceVisualToImageData } from "./convert";
import { type PixelmatchOptions } from 'pixelmatch';
export declare type ExcaliburVisual = string | HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D;
declare const ensureImagesLoaded: (...images: ExcaliburVisual[]) => Promise<ImageData[]>;
export type Visual = string | HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D;
export type DiffOptions = PixelmatchOptions;
declare const ExcaliburAsyncMatchers: jasmine.CustomAsyncMatcherFactories;
declare const ExcaliburMatchers: jasmine.CustomMatcherFactories;
export { ExcaliburAsyncMatchers, ExcaliburMatchers, ensureImagesLoaded, convertSourceVisualToImageData as asImageData };
