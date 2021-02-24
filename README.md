<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>JSS like API implemented with emotion</i>
    <br>
    <br>
    <img src="https://github.com/garronej/jss-emotion/workflows/ci/badge.svg?branch=develop">
    <img src="https://img.shields.io/bundlephobia/minzip/jss-emotion">
    <img src="https://img.shields.io/npm/dw/jss-emotion">
    <img src="https://img.shields.io/npm/l/jss-emotion">
</p>
<p align="center">
  <a href="https://github.com/garronej/jss-emotion">Home</a>
  -
  <a href="https://github.com/garronej/jss-emotion">Documentation</a>
</p>

# Install / Import

```bash
$ npm install --save jss-emotion
```

```typescript
import { myFunction, myObject } from "jss-emotion";
```

Specific imports:

```typescript
import { myFunction } from "jss-emotion/myFunction";
import { myObject } from "jss-emotion/myObject";
```

## Import from HTML, with CDN

Import it via a bundle that creates a global ( wider browser support ):

```html
<script src="//unpkg.com/jss-emotion/bundle.min.js"></script>
<script>
    const { myFunction, myObject } = jss_emotion;
</script>
```

Or import it as an ES module:

```html
<script type="module">
    import {
        myFunction,
        myObject,
    } from "//unpkg.com/jss-emotion/zz_esm/index.js";
</script>
```

_You can specify the version you wish to import:_ [unpkg.com](https://unpkg.com)

## Contribute

```bash
npm install
npm run build
npm test
```
