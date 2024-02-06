import { ExcaliburMatchers } from "../index";
import * as ex from 'excalibur';

describe('Custom matcher: toHaveValues', () => {

    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers);
    });

    it('should exist', () => {
        expect(ExcaliburMatchers.toHaveValues).toBeDefined();
    });

    xit('can match actors values', () => {
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

    xit('can negate match actors values', () => {
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