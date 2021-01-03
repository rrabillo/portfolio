import { gsap } from "gsap";

export default class Bubble {

    constructor() {
        this.$triggers = $('.js-bubble-trigger');
        this.$bubble = $('.js-bubble');
        this.$bubbleText = this.$bubble.find('span');
        this.isScrolling = false;


        this.config = [
            'comme cœur de 🦁',
            'Depuis 1 an !',
            'Mais aussi un peu de back',
            'GSAP, Wordpress, Pixijs, et d\'autres. Bientôt, j\'arrête jQuery !'
        ]

        this.bindEvents();
    }

    bindEvents() {
        this.$triggers.on('mouseenter', this.showBubble.bind(this));
        this.$triggers.on('mousemove', this.moveBubble.bind(this));
        this.$triggers.on('mouseleave', this.hideBubble.bind(this));
        $(document).on('scrolldetect:stop', () => {
            this.isScrolling = false;
        })
        $(document).on('scrolldetect:scroll', () => {
            this.isScrolling = true;
            this.hideBubble();
        })
    }

    showBubble(e) {
        if(!this.isScrolling){
            let $currentTarget = $(e.currentTarget);
            this.$bubbleText.text(this.config[this.$triggers.index($currentTarget)]);
            gsap.fromTo(this.$bubble, {scale: 0.2, alpha: 0}, {scale: 1, alpha: 1, duration: 0.3, ease: "power3.inOut"});
        }
    }

    moveBubble(e) {
        if(!this.isScrolling){
            let currX = e.clientX;
            let currY = e.clientY - this.$bubble.outerHeight();
            gsap.set(this.$bubble, {left: currX, top: currY});
        }
    }

    hideBubble() {
        gsap.to(this.$bubble,  {scale: 0.3, alpha: 0, duration: 0.2});
    }
}
