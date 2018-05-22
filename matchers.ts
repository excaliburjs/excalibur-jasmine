import { convertVisualToImageData } from "./convert";
import * as ex from "excalibur";

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
            message: `Expected image to match within ${tolerance*100}%, but only matched ${(percentDiff*100).toFixed(2)}%\r\n\r\n` +
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
    return Promise.all(images.map(convertVisualToImageData));
}

const ExcaliburMatchers: jasmine.CustomMatcherFactories = {

    toEqualImage: (util, customEqualityTester) => {

        return {
            compare: (actual: ImageData, expected: ImageData, tolerance: number = .99) => {
                return imageDiff(actual, expected, tolerance);
            }
        } 
    },

    toBeVector: (util, customEqualityTester) => {
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
    toHaveValues: (util, customEqualityTester) => {
        return {
            compare: (actual: ex.Actor, expected: ex.IActorArgs) => {

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

export { ExcaliburMatchers, ensureImagesLoaded };