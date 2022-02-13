# Magic Mirror Module: moon-phase
This [MagicMirror2] module allows you to fetch an image of the moon in its current phase

Configure the module in your `config.js` file.

## Using the module

There isn't much to configure really, you just need to position it and optionally set a suitable size for you via the config options.

Now add the module to the modules array in the `config/config.js` file:

````javascript
modules: [
        {
                module: 'phase',
                position: 'top_center',        // this can be any of the regions
                config: {
                }
        },
]
````

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `height` | 40 | The height of the image. |
| `width` | 40 | The width of the image. |