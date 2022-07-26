# Clayhead JavaScript SDK

Currently under heavy development. Please check back soon.


## Installation

### NPM

`npm install clayhead`

### CDN

Use the latest version

`https://unpkg.com/clayhead/dist/clayhead.min.js`

Or specify a version

`https://unpkg.com/clayhead@1.0.3/dist/clayhead.min.js`


## Usage

### Import

#### ESM
```
import { ClayheadClient } from "clayhead";
```

#### Common JS
```
const { ClayheadClient } = require("clayhead");
```

#### Using a CDN for quick prototyping
```
<script type="module">
    import { ClayheadClient } from "https://unpkg.com/clayhead/dist/clayhead.esm.min.js";
    ...
</script>
```

### Create a ClayheadClient instance

```
const url = "https://realtime.clayhead.ai?token=...";

const client = new ClayheadClient(url);
```

In order to authenticate with the realtime API, you must provide a token as part of the URL query.

### Create a character controller

TODO

### Send perception data and receive actions

TODO