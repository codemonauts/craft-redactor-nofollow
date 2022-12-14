(function($R) {

    $R['classes']['link.component'].prototype.getData = function()
    {
        var names = ['url', 'text', 'target', 'title', 'nofollow'];
        var data = {};

        for (var i = 0; i < names.length; i++)
        {
            data[names[i]] = this._get(names[i]);
        }

        return data;
    };

    $R['classes']['link.component'].prototype._get_nofollow = function()
    {
        if (this.attr('rel')) {
            return /nofollow/i.test(this.attr('rel'));
        }

        return false;
    };

    $R['classes']['link.component'].prototype._set_nofollow = function(nofollow)
    {
        if (nofollow === false) this.removeAttr('rel');
        else if (nofollow)
        {
            this.attr('rel', (nofollow === true) ? 'nofollow' : nofollow);
        }
    };

    $R['modals']['link'] =
        '<form action=""> \
            <div class="form-item"> \
                <label for="modal-link-url">URL <span class="req">*</span></label> \
                <input type="text" id="modal-link-url" name="url"> \
            </div> \
            <div class="form-item"> \
                <label for="modal-link-text">## text ##</label> \
                <input type="text" id="modal-link-text" name="text"> \
            </div> \
            <div class="form-item form-item-title"> \
                <label for="modal-link-title">## title ##</label> \
                <input type="text" id="modal-link-title" name="title"> \
            </div> \
            <div class="form-item form-item-target"> \
                <label class="checkbox"> \
                    <input type="checkbox" name="target"> ## link-in-new-tab ## \
                </label> \
            </div> \
            <div class="form-item form-item-nofollow"> \
                <label class="checkbox"> \
                    <input type="checkbox" name="nofollow"> ## link-nofollow ## \
                </label> \
            </div> \
        </form>';

    $R['modules']['link'].prototype._setLinkData = function(nodes, data, type)
    {
        data.text = (data.text.trim() === '') ? this._truncateText(data.url) : data.text;

        var isTextChanged = (!this.currentText || this.currentText !== data.text);

        this.selection.save();
        for (var i = 0; i < nodes.length; i++)
        {
            var $link = $R.create('link.component', this.app, nodes[i]);
            var linkData = {};

            if (data.text && isTextChanged) linkData.text = data.text;
            if (data.url) linkData.url = data.url;
            if (data.title !== undefined) linkData.title = data.title;
            if (data.target !== undefined) linkData.target = data.target;
            if (data.nofollow !== undefined) linkData.nofollow = data.nofollow;

            $link.setData(linkData);

            // callback
            this.app.broadcast('link.' + type, $link);
        }

        setTimeout(this.selection.restore.bind(this.selection), 0);
    };

    $R['modules']['link'].prototype._setFormData = function($form, $modal)
    {
        var linkData = this.$link.getData();
        var data = {
            url: linkData.url,
            text: linkData.text,
            title: linkData.title,
            target: (this.opts.linkTarget || linkData.target),
            nofollow: linkData.url === null ? this.opts.linkDefaultNoFollow : linkData.nofollow
        };

        if (!this.opts.linkNewTab) $modal.find('.form-item-target').hide();
        if (!this.opts.linkTitle) $modal.find('.form-item-title').hide();

        $form.setData(data);
        this.currentText = $form.getField('text').val();
    };

    $R['lang']['en']['link-nofollow'] = 'Set relation to "nofollow"';

})(Redactor);
