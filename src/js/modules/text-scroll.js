import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class TextScroll{

    constructor() {
        this.$triggers = $('.js-text-scroll');
        this.init();
    }

    init(){
        this.$triggers.each((n,item) => {
            let $currEl = $(item);
            let $child = $currEl.find('span');
            let tl = gsap.timeline({
                scrollTrigger:{
                    trigger:$currEl,
                    // markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                    start:'top 70%'
                }
            });
            tl.fromTo($child, {y:'100%'}, {y:'0%', duration:0.5,ease:"power3.out"});
        });
    }



}