import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
export default class ScrollTo{

    constructor() {
        this.$triggers = $('.js-scrollto');
        this.bindEvents();
    }

    bindEvents(){
        this.$triggers.on('click', this.scrollTo.bind(this));
    }

    scrollTo(e){
        gsap.to(window, {duration: 1, scrollTo: {y:'#'+$(e.currentTarget).data('target')}, ease:"power2.inOut"});
    }

}