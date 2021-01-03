import jQuery from "jquery";
const $ = jQuery;
window.$ = $;
window.jQuery = jQuery;


/*Libs*/
import 'bootstrap';

/* Custom Modules */
import Bubble from "./modules/bubble";
import ScrollDetect from "./modules/scroll-detect";
import TextWriter from "./modules/text-writer";
import TextScroll from "./modules/text-scroll";
import ProjectsList from "./modules/projects-list";
import ScrollTo from "./modules/scroll-to";
import SiteIntro from "./modules/site-intro";
import Pjax from "./modules/pjax";
import pjaxConfig from './modules/pjaxConfig';

window.app = {

};

(function($) {

    new ScrollDetect();

    function initApp(){
        app.pjax = new Pjax(pjaxConfig);

        if($('.js-bubble').length){
            new Bubble();
        }

        if($('.js-text-update').length){
            $('.js-text-update').each((n,item) => {
                new TextWriter($(item));
            });
        }

        if($('.js-text-scroll').length){
            new TextScroll();
        }

        if($('.js-projects-list').length){
            new ProjectsList();
        }

        if($('.js-scrollto').length){
            new ScrollTo();
        }

        if($('.js-site-intro').length){
            new SiteIntro();
        }
    }

    initApp();

    $(document).on('pjax:pageLoaded', () => {
       initApp();
    });




})( jQuery );