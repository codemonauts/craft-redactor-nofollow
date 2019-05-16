<?php

namespace codemonauts\nofollow;

use Craft;
use craft\base\Plugin;
use craft\redactor\events\RegisterPluginPathsEvent;
use craft\redactor\Field;
use yii\base\Event;

class Nofollow extends Plugin
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if (Craft::$app->request->isCpRequest) {
            // Register Plugin Path
            Event::on(Field::class, Field::EVENT_REGISTER_PLUGIN_PATHS, function(RegisterPluginPathsEvent $event) {
                $event->paths[] = __DIR__.'/resources/';
            });

            Field::registerRedactorPlugin('nofollow');
        }
    }
}
