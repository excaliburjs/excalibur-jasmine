type ImageVisual = HTMLCanvasElement | CanvasRenderingContext2D | HTMLImageElement | string;

declare namespace jasmine {
    export interface AsyncMatchers<T, U> {
        toEqualImage(expected: ImageVisual, tolerance?: number, expectationFailOutput?: any): PromiseLike<void>;
    }

    export interface Matchers<T> {
        /**
         * Compares ImageData to see what percentage of the pixels match
         * @param expected ImageData that is expected
         * @param tolerance [0..1] The tolerance of the compare, 1 means each pixel must match 100%, .5 means each pixel must match 50%, and so on. By default tolerance is set to .995, or 99.5% match
         * @param expectationFailOutput 
         */
        toEqualImage(expected: ImageData, tolerance?: number, expectationFailOutput?: any): boolean;

        /**
         * Compares an Excalibur vector to another.
         * @param expected Vector that is expect
         * @param delta Distance that the 2 vectors can diverge, defaults to .01
         */
        toBeVector(expected: ex.Vector, delta?: number): boolean;

        /**
         * Compares an Excalibur actor to a set of possible properties on actor
         * @param expected The expected properties on an actor
         */
        toHaveValues(expected: ex.ActorArgs): boolean;
    }
}