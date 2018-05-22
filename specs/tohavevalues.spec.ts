import { ExcaliburMatchers } from "../index";
import * as ex from 'excalibur';

describe('Custom matcher: toHaveValues', () => {

    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers);
    });

    it('should exist', () => {
        expect(ExcaliburMatchers.toHaveValues).toBeDefined();
    });

    it('can match actors values', () => {
        let actor = new ex.Actor({
            x: 1,
            y: 100,
            collisionType: ex.CollisionType.Active
        });

        expect(actor).toHaveValues({
            x: 1,
            y: 100,
            collisionType: ex.CollisionType.Active
        });
    });

    it('can negate match actors values', () => {
        let actor = new ex.Actor({
            x: 1,
            y: 100,
            collisionType: ex.CollisionType.Active
        });

        expect(actor).not.toHaveValues({
            x: 1,
            y: 10,
            collisionType: ex.CollisionType.Active
        });
    });
});