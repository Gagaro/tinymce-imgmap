# tinymce-imgmap

An image mapping plugins for TinyMCE 4

This is based on https://github.com/maschek/imgmap

How to install the plugin
=========================

## 1. copy `imgmap` folder to the tinymce `plugins` folder.

## 2. set up your instance in the tinymce.init method to use the plugin, like::

    `plugins : "... imgmap ..."`

## 3. set up your instance to use the imgmap button, for example:

    `toolbar : "... | imgmap"`

## 4. you might need to add:

    `extended_valid_elements : "img[usemap|class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],map[id|name],area[shape|alt|coords|href|target]",`

## 5. Optional configuration:

It is possible the define some parameters fpr the plugin in the `tinymce.init()` section`

    imgmap_settings : {
      status                     : false,
      code                       : false,
      dialogBaseUrl              : g_sURL,
      dialogHeight               : 550,
      pictureHeight              : 350 
    },

- `status`: `false` disable status area in dialog, defaut is `true`
- `code`: `false` disable code html button and html area in dialog, default is `true`
- `dialogBaseUrl: ` custom dialog I needed, ignore it for your usage
- `dialogHeight:` The height for the dialog whn it opens. Here you can adjust it. Default is `610`
- `pictureHeight:` The height of the picture area. When you adjust the other parameters you might adjust this value as well to fit you needs. Default is `300`

