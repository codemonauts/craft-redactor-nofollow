# Redactor nofollow link plugin for Craft CMS 3.x

![Icon](resources/nofollow.png)

Plugin to add a checkbox to Redactor's link module to add the ```rel="nofollow"``` attribute to a link.

## Background

For a lot of sites it is important to set links to ```rel="nofollow"```. Redactor provides an option to set **all** links to *nofollow*. However, this is often not required and also not the usual practice in SEO. With this plugin it is possible to enable this attribute for every single link individual within the link's edit modal. 

## Requirements

 * Craft CMS >= 3.0.0
 * Craft Redactor Plugin >= 2.1.0

## Installation

Open your terminal and go to your Craft project:

``` shell
cd /path/to/project
composer require codemonauts/craft-redactor-nofollow
./craft install/plugin nofollow
```

## Configuration

Add the new plugin to your Redactor config file:

```json
{
  "plugins": ["nofollow"]
}
```

With ❤ by [codemonauts](https://codemonauts.com)
