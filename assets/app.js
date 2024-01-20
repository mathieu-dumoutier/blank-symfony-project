import './styles/app.css';
import './bootstrap.js';

import { registerVueControllerComponents } from '@symfony/ux-vue';
registerVueControllerComponents(require.context('./vue/controllers', true, /\.vue$/));
registerVueControllerComponents();

import Routing from 'fos-router';
import routes from './routes.json';
Routing.setRoutingData(routes);

import Translator from 'bazinga-translator';
Translator.fromJSON(require('./translations/messages/fr.json'));
window.Translator = Translator;

document.addEventListener('vue:before-mount', (event) => {
    const {
        app, // The Vue application instance
    } = event.detail;

    // Ajout du Translator et du Routing dans l'application Vue
    app.config.globalProperties.Translator = Translator;
    app.config.globalProperties.Routing = Routing;
});
