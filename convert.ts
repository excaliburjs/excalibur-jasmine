import { baseImagePath } from "./matchers";

const convertVisualToImageData = (visual): Promise<ImageData> => {
    
    if (visual instanceof HTMLCanvasElement) return convertCanvas(visual);
    if (visual instanceof CanvasRenderingContext2D) return convertContext(visual);
    if (visual instanceof HTMLImageElement) return convertImageAsync(visual);
    if (typeof visual === 'string') return convertFilePath(visual);
    
}

const convertContext = (visual: CanvasRenderingContext2D) => {
    return Promise.resolve(visual.getImageData(0, 0, visual.canvas.width, visual.canvas.height));
}

const convertCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    return Promise.resolve(data);
}


const convertFilePath = (imagePath: string) => {

    const path = baseImagePath + imagePath;

    const image = new Image();
    image.src = path;

    return convertImageAsync(image);
};

const isImageLoadedAsync = (image: HTMLImageElement, loadTimeout: number = 5000) => {
    return new Promise((resolve, reject) => {
        let timeoutHandle = setTimeout(() => {
            reject(`Image with src: ${image.src} failed to load in ${loadTimeout}`);
            fail(`Image with src: ${image.src} failed to load in ${loadTimeout}`);
        }, loadTimeout);        
        if (image.width > 0 && image.height > 0) {
            clearTimeout(timeoutHandle);
            resolve(image);
        } else {
            image.addEventListener('load', () => {
                clearTimeout(timeoutHandle);
                resolve(image)
            });
        }
    });
}

const convertImageAsync = (image: HTMLImageElement) => {
    return isImageLoadedAsync(image).then(() => {
        return convertImage(image);
    });
}

const convertImage = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    return Promise.resolve(ctx.getImageData(0, 0, image.width, image.height));
}

export { convertVisualToImageData };