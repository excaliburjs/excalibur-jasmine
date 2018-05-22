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

