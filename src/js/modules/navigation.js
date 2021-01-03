import {gsap} from "gsap";

export default class Navigation{

    constructor() {
        this.$burger = $('.burger');
        this.$siteWrapper = $('.site-wrapper');
        this.$navWrapper = $('.nav-wrapper');
        this.$links = $('.nav-link');
        this.isOpen = false;

        this.buildTimeline();
        this.bindEvents();
    }

    bindEvents(){
        this.$burger.on('click', this.toggleNav.bind(this));
    }

    toggleNav(){
        if(this.isOpen){
            this.closeMenu();
        }
        else{
            this.openMenu();
        }

    }

    openMenu(){
        this.timeline.play();
        this.isOpen = true;
    }

    closeMenu(){
        this.timeline.reverse();
        this.isOpen = false;
    }


    buildTimeline(){
        this.timeline = new gsap.timeline({paused:true,
            onStart: () => {
                this.$navWrapper.addClass('is-shown');
                $('body').addClass('menu-open');
            },
            onReverseComplete: () => {
                this.$navWrapper.removeClass('is-shown');
                $('body').removeClass('menu-open');
            }
        });

        this.timeline.to(this.$siteWrapper, {duration:0.5, scale:0.4, ease:"power1.inOut"}, 'start');
        this.timeline.to(this.$navWrapper, {duration:0.5, alpha:1, ease:"power1.inOut"}, 'start');

        this.timeline.staggerTo(this.$links, 0.5,{y:"0%", ease:"power2.inOut"}, 0.1, 'start+=0.1');

    }





}