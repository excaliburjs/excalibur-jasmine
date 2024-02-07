/// <reference path="matcher-types.d.ts" />

import { convertSourceVisualToImageData, ImageVisual } from "./convert";
import * as pixelmatch from 'pixelmatch';
import { type PixelmatchOptions } from 'pixelmatch';
import type * as ex from 'excalibur';

export declare type ExcaliburVisual = string | HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D;

const ensureImagesLoaded = (...images: ExcaliburVisual[]): Promise<ImageData[]> => {
    let results: Promise<ImageData>[] = [];
    for (let image of images) {
        results.push(convertSourceVisualToImageData(image));
    }
    return Promise.all(results);
}


const img1Canvas = document.createElement('canvas');
const img1Context = img1Canvas.getContext('2d')!;

const img2Canvas = document.createElement('canvas');
const img2Context = img2Canvas.getContext('2d')!;

const diffCanvas = document.createElement('canvas');
const diffContext = diffCanvas.getContext('2d')!;

export type Visual = string | HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D;
export type DiffOptions = PixelmatchOptions;

const flushSourceToImageData = async (source: Visual, context: CanvasRenderingContext2D) => {
    if (source instanceof HTMLImageElement) {
        source.decoding = 'sync';

        if (source.src) {
            try {
                await source.decode();
            } catch {
                console.warn(`Image could not be decoded, check image src: ${source.src}`)
            }
        }
        context.canvas.width = source.naturalWidth || source.width;
        context.canvas.height = source.naturalHeight || source.height;
        context.imageSmoothingEnabled = false;
        context.drawImage(source, 0, 0);
    } else if (source instanceof HTMLCanvasElement) {
        context.canvas.width = source.width;
        context.canvas.height = source.height;
        context.imageSmoothingEnabled = false;
        context.drawImage(source, 0, 0);
    } else if (source instanceof CanvasRenderingContext2D) {
        const imageData = source.getImageData(0, 0, source.canvas.width, source.canvas.height);
        context.canvas.width = source.canvas.width;
        context.canvas.height = source.canvas.height;
        context.imageSmoothingEnabled = false;
        context.putImageData(imageData, 0, 0);
    } else if (typeof source === 'string') {
        // load image
        const img = new Image();
        const loaded = new Promise<void>((resolve, _) => {
            img.onload = () => resolve();
        });
        const baseImagePath = '';
        img.decoding = 'sync';
        if (source) {
            img.src = baseImagePath + source + '?_=' + Math.random();
            try {
                await loaded;
                await img.decode();
            } catch {
                console.warn(`Image could not be decoded, check image src: ${img.src}`)
            }
        }

        context.canvas.width = img.width;
        context.canvas.height = img.height;
        context.imageSmoothingEnabled = false;

        context.drawImage(img, 0, 0);
    }
    return context.getImageData(0, 0, context.canvas.width, context.canvas.height);
}

const compareImageData = (actualData: ImageData, expectedData: ImageData, tolerance: number) => {
    if (actualData.width !== expectedData.width ||
        actualData.height !== expectedData.height) {
        return {
            pass: false,
            message: `Expected image dimension to be (${expectedData.width}x${expectedData.height}), but got (${actualData.width}x${actualData.height})`
        }
    }

    const { width, height } = expectedData;
    diffContext.canvas.width = width;
    diffContext.canvas.height = height;
    const diffData = diffContext.createImageData(width, height);

    let length = actualData.data.length;
    let totalPixels = length / 4;
    const pixelsDiff = pixelmatch(actualData.data, expectedData.data, diffData.data, width, height);
    let percentDiff = ((totalPixels - pixelsDiff) / totalPixels);
    diffContext.putImageData(diffData, 0, 0)

    const actualBase64 = img1Context.canvas.toDataURL('image/png', 0);
    const expectedBase64 = img2Context.canvas.toDataURL('image/png', 0);
    const diffBase64 = diffContext.canvas.toDataURL('image/png', 0);

    if (percentDiff < tolerance) {
        return {
            pass: false,
            message:
                `Expected image to match within ${tolerance * 100}%, but only matched ${(percentDiff * 100).toFixed(2)}%. ${pixelsDiff} pixels different.\r\n\r\n` +
                `Expected: ${actualBase64}\r\n\r\n` +
                `To be: ${expectedBase64}\r\n\r\n` +
                `Diff: ${diffBase64}\r\n\r\n`
        }
    } else {
        return {
            pass: true,
            message: `Expected image matches actual within tolerance (${(percentDiff * 100).toFixed(2)})`
        }
    }
}


const ExcaliburAsyncMatchers: jasmine.CustomAsyncMatcherFactories = {

    toEqualImage: (util: jasmine.MatchersUtil) => {
        return {
            compare: async (actual: Visual, expected: Visual, tolerance: number = .995) => {
                const actualData = await flushSourceToImageData(actual, img1Context);
                const expectedData = await flushSourceToImageData(expected, img2Context);
                return compareImageData(actualData, expectedData, tolerance);
            }
        }
    }
}

const ExcaliburMatchers: jasmine.CustomMatcherFactories = {

    toEqualImage: () => {

        return {
            compare: (actual: ImageData, expected: ImageData, tolerance: number = .995) => {
                return compareImageData(actual, expected, tolerance);
            }
        }
    },

    toBeVector: () => {
        return {
            compare: (actual: ex.Vector, expected: ex.Vector, delta: number = .01) => {

                let distance = actual.distance(expected);
                if (distance <= delta) {
                    return {
                        pass: true,
                        message: `Vector within delta ${distance} <= ${delta}`
                    }
                } else {
                    return {
                        pass: false,
                        message: `Expected ex.Vector${actual.toString()} to be within ${delta} of ex.Vector${expected.toString()}, but was ${distance} distance apart`
                    }
                }
            }
        }
    },
    toHaveValues: () => {
        return {
            compare: (actual: ex.Actor, expected: ex.ActorArgs) => {

                let message = 'Expected actor to have properties:\r\n\r\n';
                let passed = true;
                for (let key in expected) {
                    if (actual[key] !== expected[key]) {
                        passed = false;
                        message += `Expected actor.${key} to be ${expected[key]}, but got ${actual[key]}\r\n`
                    }
                }

                return {
                    pass: passed,
                    message: passed ? 'Actor properties match' : message
                }
            }
        }
    }
}

export { ExcaliburAsyncMatchers, ExcaliburMatchers, ensureImagesLoaded, convertSourceVisualToImageData as asImageData };