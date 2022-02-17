# Magic Mirror Module: Moon phase
This [MagicMirror2] module allows you to fetch an image of the moon in its current phase

Configure the module in your `config.js` file.

## Using the module

There isn't much to configure really, you just need to position it and optionally set a suitable size for you via the config options.

Now add the module to the modules array in the `config/config.js` file:


        modules: [
                {
                        module: 'phase',
                        position: 'top_center',        // this can be any of the regions
                        config: {
                                width: "70",
                                height: "70"
                        }
                },
        ]

## Compliments

        compliments: {
                new_moon : [
                        "<i class=\"silver wi wi-moon-new\"></i> New Moon",
                ],
                waxing_crescent : [
                "<i class=\"gold wi wi-moon-waxing-crescent-4\"></i> Waxing Crescent",
                ],
                first_quarter : [
                        "<i class=\"gold wi wi-moon-first-quarter\"></i> First Quarter",
                ],
                waxing_gibbous : [
                        "<i class=\"gold wi wi-moon-waxing-gibbous-4\"></i> Waxin Gibbous",
                ],
                full_moon : [
                        "<i class=\"silver wi wi-moon-full\"></i> Full Moon",
                ],
                waning_gibbous : [
                        "<i class=\"gold wi wi-moon-waning-gibbous-4\"></i> Waning Gibbous",
                ],
                third_quarter : [
                        "<i class=\"gold wi wi-moon-third-quarter\"></i> Third Quarter",
                ],
                waning_crescent : [
                        "<i class=\"gold wi wi-moon-waning-crescent-4\"></i> Waning Crescent",
                ],
        }