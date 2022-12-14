<?php

namespace codemonauts\nofollow;

use Craft;
use craft\base\Plugin;
use craft\redactor\events\ModifyRedactorConfigEvent;
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

        if (Craft::$app->getRequest()->getIsCpRequest()) {
            // Register Plugin Path
            Event::on(Field::class, Field::EVENT_REGISTER_PLUGIN_PATHS, function (RegisterPluginPathsEvent $event) {
                $event->paths[] = Craft::getAlias('@codemonauts/nofollow/resources');
            });

            // Register config
            Event::on(Field::class, Field::EVENT_DEFINE_REDACTOR_CONFIG, function (ModifyRedactorConfigEvent $event) {
                $event->config['linkDefaultNoFollow'] = $event->config['linkDefaultNoFollow'] ?? false;
            });
        }
    }
}
