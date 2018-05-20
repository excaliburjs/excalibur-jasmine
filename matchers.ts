import { convertVisualToImageData } from "./convert";

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
    for(;i < length; i+=4) {
        if (aData.data[i] !== eData.data[i] ||
            aData.data[i + 1] !== eData.data[i + 1] ||
            aData.data[i + 2] !== eData.data[i + 2] ||
            aData.data[i + 3] !== eData.data[i + 3]
            ) {
                diff++;
            }
    }

    let percentDiff = ((pixels - diff)/ pixels);
    if (percentDiff < tolerance) {
        return {
            pass: false,
            message: `Expected image to match within ${tolerance*100}%, but only matched ${(percentDiff*100).toFixed(2)}%`
        }
    } else {
        return {
            pass: true,
            message: 'Expected image matches within tolerance'
        }
    }
}


const ensureImagesLoaded = (...images: ExcaliburVisual[]): Promise<ImageData[]> => {
    return Promise.all(images.map(convertVisualToImageData));
}

const baseImagePath = '/base/';

const ExcaliburMatchers: jasmine.CustomMatcherFactories = {

    toEqualImage: (util, customEqualityTester) => {

        return {
            compare: (actual: ImageData, expected: ImageData, tolerance: number) => {
                return imageDiff(actual, expected, tolerance);
            }
        } 
    }
}

export { ExcaliburMatchers, ensureImagesLoaded, baseImagePath };