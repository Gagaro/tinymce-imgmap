(function() {
	tinymce.PluginManager.requireLangPack('imgmap', 'en');
	
	tinymce.PluginManager.add('imgmap', function(ed, url) {
        // Register commands
        ed.addCommand('mceimgmapPopup', function() {
            var e = ed.selection.getNode();

            // Internal image object like a flash placeholder
            if (ed.dom.getAttrib(e, 'class').indexOf('mceItem') != -1)
                return;

            ed.windowManager.open({
                file : url + '/popup.html',
                width : 700,
                height : 560,
                inline : 1
            }, {
                plugin_url : url
            });
        });

        // Register buttons
        //tinyMCE.getButtonHTML(cn, 'lang_imgmap_desc', '{$pluginurl}/images/tinymce_button.gif', 'mceimgmapPopup');
        ed.addButton('imgmap', {
            title : 'imgmap.desc',
            cmd : 'mceimgmapPopup',
            image : url + '/images/tinymce_button.gif',
            onPostRender: function() {
                var ctrl = this;

                ed.on('NodeChange', function (ed, cm, node) {

                    if (node == null)
                        return;

                    //check parents
                    //if image parent already has imagemap, toggle selected state, if simple image, use normal state
                    do {
                        //console.log(node.nodeName);
                        if (node.nodeName == "IMG" && ed.dom.getAttrib(node, 'class').indexOf('mceItem') == -1) {
                            if (ed.dom.getAttrib(node, 'usemap') != '') {
                                cm.setDisabled('imgmap', false);
                                cm.setActive('imgmap', true);
                            }
                            else {
                                cm.setDisabled('imgmap', false);
                                cm.setActive('imgmap', false);
                            }
                            return true;
                        }
                    }
                    while ((node = node.parentNode));

                    //button disabled by default
                    cm.setDisabled('imgmap', true);
                    cm.setActive('imgmap', false);
                    return true;
                });
            },
        });

    });

    /* Removed since 4?
    getInfo : function() {
        return {
            longname  : 'Image Map Editor',
            author    : 'Gagaro, Adam Maschek, John Ericksen',
            authorurl : 'https://github.com/Gagaro/tinymce-imgmap',
            infourl   : 'https://github.com/Gagaro/tinymce-imgmap',
            version   : "4.0beta1"
        };
    }*/
})();