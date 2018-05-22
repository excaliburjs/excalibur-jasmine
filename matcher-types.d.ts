
declare namespace jasmine {
    export interface Matchers<T> {
        /**
         * Compares ImageData to see what percentage of the pixels match
         * @param expected ImageData that is expected
         * @param tolerance [0..1] The tolerance of the compare, 1 means each pixel must match 100%, .5 means each pixel must match 50%, and so on.
         * @param expectationFailOutput 
         */
        toEqualImage(expected: ImageData, tolerance?: number, expectationFailOutput?: any): boolean;

        toBeVector(expected: ex.Vector, delta?: number): boolean;

        toHaveValues(expected: ex.IActorArgs): boolean;
    }
}