# Module: MMM-Snow

[![Platform](https://img.shields.io/badge/platform-MagicMirror2-informational)](https://github.com/hangorazvan/MagicMirror2)
[![CC-0 license](https://img.shields.io/badge/License-CC--4.0-blue.svg)](https://creativecommons.org/licenses/by-nd/4.0)

The module supports themes. Current themes are *winter* and *love*. The first one let's it snow while the latter conjurs hearts on your mirror.  
Configure the module in your `config.js` file.

**Note:** After starting the Mirror, it will take a few seconds before the snow begins to fall ...

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'snow',
		position: 'fullscreen_above',
		config: { // See 'Configuration options' for more information.
			flakeCount: 100,
			theme: "winter"			
		}
	}
]
````

## Configuration options

The following property can be configured:


|Option|Description|
|---|---|
|`flakeCount`|The number of snow flakes. More flakes are havier for the cpu, so don't go wild. <br>**Default value:** `100`|
|`theme`| Defines the type of "flakes". Possible values are `winter`, `love`, and `water`.<br>**Default value:** `winter`|

## Defineing new themes

Certainly, there are many opportunities for new themes. To extend this module with new themes takes three simple development steps.

### Add image files
Add your "flake" images to folder `./images` in `MMM-Snow`directory. The image has to be a PNG with transparent background color. Make size of the file similar to existing files (50x50). The file names have to have a prefix followed by a number, e.g. `foo1.png`, `foo2.png`, `foo3.png`.

### Reference images in CSS classes
Create new CSS classes in `MMM-Snow.css`, which reference your images. Class name and file name n´have to be identical. 
````css
.snow .foo1 {background-image: url('images/foo1.png');}
.snow .foo2 {background-image: url('images/foo2.png');}
````

### Define theme
Extend the `themes` map in the file `snow.js`. Just add another entry   
````javascript
"bar"   : { 
	"flakePrefix" : "foo",    
	"imagesCount"  : 3,         // number of images in this theme, here:  foo1, foo2, foo3
	"downwards"    : false,     // flakes move upwards from bottom to top
	"sizeFactor"   : 2}         // adapt size of flakes to your liking, <1 smaller, =1 original, >1 larger 
````
The named index `bar` is the externally visible theme name, which has to be used in `config.js`. Setting `flakePrefix` tells how the image files and CSS classes are called; in our example it should be `foo`. `imagesCount` defines how many image files / css classes are there. If you have three images, put `3` which makes the module using `foo1`, `foo2`, and `foo3` respectively. The boolean setting `downwards` defines the direction of flakes' movements; `true` means downwards and `true` means upwards. Setting `sizeFactor` makes the flake images larger or smaller; values between 0 and 1 makes the flake smaller, while values larger  than 1 enlarges them.

### Configure new theme
To use the new theme, change the `theme` parameter for the `MMM-Snow` module in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'snow',
		position: 'fullscreen_above',
		config: {
			theme: "bar"
		}
	}
]
````
After restarting the mirror the new snow theme should be displayed. 

Redesigned by Răzvan Cristea https://github.com/hangorazvan Creative Commons BY-NC-SA 4.0, Romania.