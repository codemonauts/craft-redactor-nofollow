# Redactor nofollow link plugin for Craft CMS

![Icon](resources/nofollow.png)

Plugin to add a checkbox to Redactor's link module to add the ```rel="nofollow"``` attribute to a link.

## Background

For a lot of sites it is important to set links to ```rel="nofollow"```. Redactor provides an option to set **all**links
to *nofollow*. However, this is often not required and also not the usual practice in SEO. With this plugin it is
possible to enable this attribute for every single link individual within the link's edit modal.

## Requirements

* Craft CMS >= 4.0.0
* Craft Redactor Plugin >= 3.0.0

## Installation

Open your terminal and go to your Craft project:

``` shell
cd /path/to/project
composer require codemonauts/craft-redactor-nofollow
./craft plugin/install nofollow
```

You can also install the plugin via the Plugin Store in the Craft Control Panel.

## Configuration

Add the new plugin to your Redactor config file:

```json
{
  "plugins": [
    "nofollow"
  ]
}
```

You can configure whether the checkbox in the link dialog should be checked by default when adding a new link. Just add the following config to your Redactor config file:

```json
{
  "linkDefaultNoFollow": true
}
```

The ```nofollow``` will be stripped in all Redactor fields by the HTMLPurifier, which is enabled by default. Instead of disabling the hole HTMLPurifier for a field, you should add the following line to the ```config/htmlpurifier/Default.json```:

```json
{
  "Attr.AllowedRel": [
    "nofollow"
  ]
}
```

With ❤ by [codemonauts](https://codemonauts.com)
