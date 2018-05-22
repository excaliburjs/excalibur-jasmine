import { ExcaliburMatchers } from "../index";
import * as ex from 'excalibur';

describe('Custom matcher: toBeVector', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers)
    });

    it('should exist', () => {
        expect(ExcaliburMatchers.toBeVector).toBeDefined();
    });

    it('can match vectors that are equal', () => {
        expect(new ex.Vector(15, 20)).toBeVector(new ex.Vector(15, 20));
    });

    it('can negate vectors that are not equal', () => {
        expect(new ex.Vector(15, 25)).not.toBeVector(ex.Vector.Zero);
    });

    it('can match vectors within a tolerance', () => {
        expect(new ex.Vector(20, 15)).toBeVector(new ex.Vector(20, 14), 1);
    });

    it('can negate match vectors within a tolerance', () => {
        expect(new ex.Vector(20, 15)).not.toBeVector(new ex.Vector(20, 14), .5);
    });
});