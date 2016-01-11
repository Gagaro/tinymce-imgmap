# tinymce-imgmap
An image mapping plugins for TinyMCE 4

This is based on https://github.com/maschek/imgmap

# WIP: DOES NOT WORK YET

How to install the plugin
=========================

1. copy `imgmap` folder to the tinymce `plugins` folder.

2. set up your instance in the tinyMCE.init method to use the plugin, like::

  plugins : "... imgmap ..."

3. set up your instance to use the imgmap button, for example::

  toolbar : "... | imgmap"

4. you might need to add::

  extended_valid_elements : "img[usemap|class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],map[id|name],area[shape|alt|coords|href|target]",
