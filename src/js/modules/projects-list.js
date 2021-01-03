import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin} from "gsap";

gsap.registerPlugin(ScrollTrigger, CSSPlugin);

export default class ProjectsList{

    constructor() {
        this.$wrapper = $('.js-projects-list');
        this.$lines = this.$wrapper.find('.js-projects-list-line');
        this.$imgs = this.$wrapper.find('.projects-list__bg');

        setTimeout(() => { // Sometimes gsap doenst get css value fast enough, i'll need to dig that
            this.init();
        },250)
    }

    init() {
        ScrollTrigger.matchMedia({
            "(min-width:1200px)": () => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.$wrapper,
                        start: 'top 70%'
                    }
                });
                tl.fromTo(this.$lines, {scaleX: 1}, {
                    scaleX: 0,
                    stagger: {each: 0.1, from: this.$lines.length},
                    duration: 1,
                    ease: "power3.out"
                });
                return function() {
                    tl.kill();
                    gsap.set(this.$imgs, {clearProps:"transform"});
                };
            },
            '(max-width:1199px)': () => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.$wrapper,
                        start: 'top center'
                    }
                });
                tl.fromTo(this.$imgs, {y: '-50px', alpha: 0}, {
                    y: '0%',
                    alpha: 1,
                    stagger: {each: 0.1},
                    duration: 0.5,
                    ease: "power3.out",
                });
                return () => {
                    tl.kill();
                    gsap.set(this.$imgs, {clearProps:"transform,opacity"});
                };
            }
        });
    }


}