/// <reference path="matcher-types.d.ts" />

import { convertSourceVisualToImageData, ImageVisual } from "./convert";
import * as pixelmatch from 'pixelmatch';
import { type PixelmatchOptions } from 'pixelmatch';
import type * as ex from 'excalibur';

export declare type ExcaliburVisual = string | HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D;

const imageDiff = (actual: ImageData, expected: ImageData, tolerance: number) => {
    let aData = actual;
    let eData = expected;
    // Dimensions must match
    if (aData.width !== eData.width ||
        aData.height !== eData.height) {
        return {
            pass: false,
            message: `Expected image dimension to be (${eData.width}x${eData.height}), but got (${aData.width}x${aData.height})`
        }
    }

    let i = 0;
    let length = aData.data.length;
    let pixels = length / 4;
    let diff = 0;
    let diffData = new ImageData(aData.width, aData.height);
    for(;i < length; i+=4) {
        if (aData.data[i    ] !== eData.data[i    ] ||
            aData.data[i + 1] !== eData.data[i + 1] ||
            aData.data[i + 2] !== eData.data[i + 2] ||
            aData.data[i + 3] !== eData.data[i + 3]
            ) {
                diff++;
            }
        diffData.data[i    ] = Math.abs(aData.data[i    ] - eData.data[i   ]);
        diffData.data[i + 1] = Math.abs(aData.data[i + 1] - eData.data[i + 1]);
        diffData.data[i + 2] = Math.abs(aData.data[i + 2] - eData.data[i + 2]);
        diffData.data[i + 3] = Math.abs(255 -Math.abs(aData.data[i + 3] - eData.data[i + 3]));
    }

    let percentDiff = ((pixels - diff)/ pixels);
    if (percentDiff < tolerance) {
        return {
            pass: false,
            message: `Expected image to match within ${tolerance*100}%, but only matched ${(percentDiff*100).toFixed(2)}%. ${diff} pixels different.\r\n\r\n` +
                     `Expected: ${toBase64Image(aData)}\r\n\r\n` + 
                     `To be: ${toBase64Image(eData)}\r\n\r\n` + 
                     `Diff: ${toBase64Image(diffData)}\r\n\r\n`
        }
    } else {
        return {
            pass: true,
            message: `Expected image matches actual within tolerance (${(percentDiff*100).toFixed(2)})`
        }
    }
}

const toBase64Image = (imageData: ImageData) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png', 0);
}


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
    context.canvas.width = source.naturalWidth;
    context.canvas.height = source.naturalHeight;
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
  } else if (typeof source === 'string') {
    // load image
    const img = new Image();
    const baseImagePath = '';
    img.decoding = 'sync';
    if (source) {
        img.src = baseImagePath + source + '?_=' + Math.random();
        try {
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

const ExcaliburAsyncMatchers: jasmine.CustomAsyncMatcherFactories = {

    toEqualImage: (util: jasmine.MatchersUtil) => {

        return {
          compare: async (actual: Visual, expected: Visual, tolerance: number = .995) => {
            const actualData = await flushSourceToImageData(actual, img1Context);
            const expectedData = await flushSourceToImageData(expected, img2Context);

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
            let percentDiff = ((totalPixels - pixelsDiff)/ totalPixels);
    
            diffContext.putImageData(diffData, 0, 0)
    
            const actualBase64 = img1Context.canvas.toDataURL('image/png', 0);
            const expectedBase64 = img2Context.canvas.toDataURL('image/png', 0);
            const diffBase64 = diffContext.canvas.toDataURL('image/png', 0);
            return {
              pass: percentDiff > (1 - tolerance),
              message:
                `Expected image to match within ${tolerance*100}%, but only matched ${(percentDiff*100).toFixed(2)}%. ${pixelsDiff} pixels different.\r\n\r\n`  +
                `Expected: ${actualBase64}\r\n\r\n` +
                `To be: ${expectedBase64}\r\n\r\n` + 
                `Diff: ${diffBase64}\r\n\r\n`
            }
          }
        }
      }
}

const ExcaliburMatchers: jasmine.CustomMatcherFactories = {

    toEqualImage: ()=> {

        return {
            compare: (actual: ImageData, expected: ImageData, tolerance: number = .995) => {
                return imageDiff(actual, expected, tolerance);
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