# Excalibur Jasmine Matchers

[![Build Status](https://travis-ci.org/excaliburjs/excalibur-jasmine.svg?branch=master)](https://travis-ci.org/excaliburjs/excalibur-jasmine)

This library is built to help test excalibur, and games made with excalibur.

These matchers are only supported in a browser context.

## Installation

`npm install excalibur-jasmine --save-dev --save-exact`

In your jasmine test file

```typescript
import { ExcaliburMatchers }
import * as ex from 'excalibur';

describe('A new thingy', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers)
    });
    
    it('should be fast', () => {
      ...
    });
    
});

```

## Matchers

### toEqualImage

For loading images, there is a helper called `ensureImagesLoaded` that will ensure that any image resources are loaded into the test before comparing them.

```typescript
import { ExcaliburMatchers, ensureImagesLoaded }
import * as ex from 'excalibur';

describe('A new thingy', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers)
    });
    
    it('should match images', (done) => {
      let engine = new ex.Engine({width: 100, height: 100});
      ensureImagesLoaded(engine.canvas, 'images/expectedcanvas.png').then(([canvasImage, expectedImage]) => {
         expect(canvasImage).toEqualImage(expectedImage, .99);
         done()
      })
    });
    
});

```

### toBeVector

This matcher is useful for comparing positions or velocities on objects in excalibur

```typescript
import { ExcaliburMatchers, ensureImagesLoaded }
import * as ex from 'excalibur';

describe('A new thingy', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers)
    });
    
    it('should be at position', () => {
      let actor = new ex.Actor({
        x: 1,
        y: 10
      });
      
      expect(actor.pos).toBeVector(new ex.Vector(1, 10));
    });
    
});

```

### toHaveValues

This matcher is useful for checking bespoke properties on an actor

```typescript
import { ExcaliburMatchers, ensureImagesLoaded }
import * as ex from 'excalibur';

describe('A new thingy', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers)
    });
    
    it('should have values', () => {
      let actor = new ex.Actor({
        x: 1,
        y: 10,
        collisionType: ex.CollisionType.Fixed,
        color: ex.Color.Red
      });
      
      expect(actor).toHaveValues({
        x: 1,
        y: 10,
        collisionType: ex.CollisionType.Fixed,
        color: ex.Color.Red
      });
    });
    
});

```
