tinymce.PluginManager.requireLangPack('imgmap', 'de,en,fr');

// Register commands
tinymce.PluginManager.add('imgmap', function(ed, url) {

  ed.plugin_translate = function(val) {
    return (tinymce.i18n.data[tinymce.settings.language][val] !== undefined)
        ? tinymce.i18n.data[tinymce.settings.language][val]
        : val;
  };

  ed.addCommand('mceimgmapPopup', function() {
    var e = ed.selection.getNode();

    // Internal image object like a flash placeholder
    if (ed.dom.getAttrib(e, 'class').indexOf('mceItem') !== -1)
      return;

    ed.windowManager.open({
      id: "imgmap",
      title: ed.plugin_translate('imgmap.desc'),
      file: url + '/popup.html',
      width: 800,
      height: tinymce.settings.imgmap_settings.dialogHeight || 610,
      buttons: [{
        text: ed.plugin_translate('imgmap.btnUpdate'),
        onclick: function(e) {
          var iframes = document.getElementsByTagName('iframe');
          var tgtWindow;
          for(var i=0; i<iframes.length; i++){
            if ( iframes[i].src.indexOf("/imgmap/popup.html") !== -1) {
              tgtWindow = iframes[i].contentWindow;
              tgtWindow.updateAction();
            }
          }
        }
      }, {
        text: ed.plugin_translate('imgmap.btnCancel'),
        onclick: 'close'
      }, {
        text: ed.plugin_translate('imgmap.btnRemove'),
        onclick: function(e) {
          var iframes = document.getElementsByTagName('iframe');
          var tgtWindow;
          for(var i=0; i<iframes.length; i++){
            if ( iframes[i].src.indexOf("/imgmap/popup.html") !== -1) {
              tgtWindow = iframes[i].contentWindow;
              tgtWindow.removeAction();
            }
          }
        }
      }]
    }, {
      plugin_url: url
    });
  });

  // Register buttons
  ed.addButton('imgmap', {
    title: ed.plugin_translate('imgmap.desc'),
    cmd: 'mceimgmapPopup',
    image: url + '/images/tinymce_button.gif',
    onPostRender: function() {
      var ctrl = this;

      ed.on('NodeChange', function(event) {
        var node = event.element;

        if (node === null)
          return;

        //check parents
        //if image parent already has imagemap, toggle selected state, if simple image, use normal state
        do {
          //console.log(node.nodeName);
          if (node.nodeName === "IMG" && ed.dom.getAttrib(node, 'class').indexOf('mceItem') === -1) {
            if (ed.dom.getAttrib(node, 'usemap') !== '') {
              ctrl.disabled(false);
              ctrl.active(true);
            } else {
              ctrl.disabled(false);
              ctrl.active(false);
            }
            return true;
          }
        }
        while ((node = node.parentNode));

        //button disabled by default
        ctrl.disabled(true);
        ctrl.active(false);
        return true;
      });
    }
  });

});

