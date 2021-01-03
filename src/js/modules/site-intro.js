import { gsap } from "gsap";
import { Draggable } from "gsap/draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

gsap.registerPlugin(Draggable, InertiaPlugin, MotionPathPlugin, ScrollToPlugin);


export default class SiteIntro{

    constructor() {
        this.$wrapper = $('.js-site-intro');
        this.$line = $('.js-site-intro-line');
        this.$top = $('.js-site-intro-top');
        this.$bottom = $('.js-site-intro-bottom');
        this.$cursor = $('.js-site-intro-cursor');
        this.$drag = $('.js-site-intro-drag');
        this.$waypoint = $('.js-site-intro-waypoint');
        this.$dragText = $('.js-site-intro-drag-text');
        this.$helloWrap = $('.js-site-intro-hello');
        this.$firstPart = $('.js-site-intro-first');
        this.$scrollDown = $('.js-scroll-down');

        this.isDragged = false;

        if(!sessionStorage.getItem('intro-shown')){
            setTimeout(() =>{
                window.scrollTo(0, 0);
                this.initScrollDown();
                disableBodyScroll($(window)[0]);
            }, 250 );
            $('body').addClass('is-none');
            this.initAnim();
            this.bindEvents();
        }
        else{
            this.$wrapper.hide();
        }

    }

    bindEvents(){
        let resizeTimer
        $(window).on('resize', () => {
            if(!this.isDragged){
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {

                    Draggable.get(this.$line).kill();
                    this.initAnim();
                }, 250);
            }
        });
    }

    initAnim(){
        let offset = this.isMobile() ? 50 : 100;
        let dragAnimValue = this.isMobile() ? '+=100' : '+=200';

        gsap.set(this.$line, {x:-this.$wrapper.width() + offset });
        gsap.set(this.$helloWrap, {y:'25px', alpha:0});
        gsap.set(this.$firstPart, {scale:0.7, alpha:0});


        let paths = [
            {
                x:this.$waypoint.offset().left - this.$cursor.offset().left,
                y:this.$waypoint.offset().top - this.$cursor.offset().top
            },
            {
                x:this.$drag.offset().left - this.$cursor.offset().left - 10,
                y:this.$drag.offset().top - this.$cursor.offset().top - 10
            }
        ];
        this.cursorTl = gsap.timeline({ onComplete:() => {
                $('body').removeClass('is-none');
            }
        });
        this.cursorTl.fromTo(this.$cursor, {y:'10px', alpha:0}, {y:'0px', alpha:1, duration:0.5}, 'start');
        this.cursorTl.to(this.$cursor, {motionPath:{
                curviness:1.25,
                path:paths
            },
            duration:2,
            ease:"power1.inOut",
            onComplete:() => {
                this.$cursor.addClass('is-drag');
            }
        }, '+=0.5');
        this.cursorTl.to(this.$cursor, {x:dragAnimValue, duration:1, ease:"power1.inOut"}, 'drag');
        this.cursorTl.to(this.$line, {x:dragAnimValue, duration:1, ease:"power1.inOut"}, 'drag');
        this.cursorTl.to(this.$cursor, {alpha:0, duration:0.5, ease:'power3.out', onComplete: () => {
            this.$dragText.addClass('is-shown');
            this.$cursor.hide();
            }
        });

        this.panelTl = gsap.timeline({paused:true,
            onComplete:() => {
                this.$wrapper.hide();
                clearAllBodyScrollLocks();
                this.$scrollDown.addClass('is-shown');
                sessionStorage.setItem('intro-shown', true);
            }
        });
        this.panelTl.fromTo(this.$line, {alpha:1}, {alpha:0, duration:0.2, ease:"power3.inOut"}, 'start');
        this.panelTl.fromTo(this.$top, {y:'0%'}, {y:'-100%', duration:1, ease:"power3.inOut"}, 'start');
        this.panelTl.fromTo(this.$bottom, {y:'0%'}, {y:'100%', duration:1, ease:"power3.inOut"}, 'start');
        this.panelTl.to(this.$helloWrap, {y:'0px', alpha:1, duration:0.5, ease:"power2.out"}, 'hello');
        this.panelTl.to(this.$helloWrap, {y:'-25px', alpha:0, duration:0.5, ease:"power2.out"}, 'hello+=1');
        this.panelTl.to(this.$firstPart, {scale:1, alpha:1, duration:1, ease:"power3.out"}, 'end');

        this.drag = Draggable.create(this.$line, {
            type:"x",
            inertia:true,
            edgeResistance:1,
            bounds:{
                minX:-this.$wrapper.width() + 30,
                maxX:0
            },
            onDrag: this.updateScrollDrag.bind(this),
            onThrowUpdate: this.updateScrollDrag.bind(this)
        });
    }

    initScrollDown(){
        gsap.timeline({
            scrollTrigger:{
                trigger : this.$scrollDown,
                // markers: {startColor: "green", endColor: "red", fontSize: "12px"},
                start:'top 70%',
                onEnter: () => {
                    this.$scrollDown.removeClass('is-shown');
                }
            }
        });
    }

    updateScrollDrag(){
        this.$dragText.removeClass('is-shown');
        let percent = (this.drag[0].x / this.drag[0].minX);
        if(percent === 0){
            this.isDragged = true;
            Draggable.get(this.$line).kill();
            this.panelTl.play();
        }
    }

    isMobile(){
        return window.matchMedia("(max-width:500px)").matches;
    }
}