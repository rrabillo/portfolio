import { gsap } from "gsap";

const pjaxConfig = {
	"home":{
		bgClass : 'bg-grey',
		timelineLeave: () => {
			let timeline = new gsap.timeline({paused:true});
			timeline.fromTo($('.transition-layer'), {x:'-100%'},{duration:1, x:'0%', ease:'power3.inOut'});
			return timeline;
		},
		timelineEnter: ($data) => {
			let timeline = new gsap.timeline({paused:true});
			timeline.fromTo($('.transition-layer'), {x:'0%'},{duration:1, x:'100%', ease:'power3.inOut'});
			return timeline;
		},
	},
	"project":{
		bgClass : 'bg-dark',
		timelineEnter: ($data) => {
			let timeline = new gsap.timeline({paused:true});
			timeline.fromTo($('.transition-layer'), {x:'0%'},{duration:1, x:'100%', ease:'power3.inOut'});
			timeline.fromTo($data.find('.project-main__img__overlay'), {scaleX:1}, {duration:0.5, scaleX:0, ease:'power3.Out'}, '-=0.5');
			timeline.fromTo($data.find('.col-right'), {y:'15px', alpha:0}, {duration:0.5,alpha:1, y:'0', ease:'power3.Out'}, '-=0.5');
			timeline.fromTo($data.find('.projects-blocks__item'), {y:'15px', alpha:0}, {duration:0.5,alpha:1, y:'0', ease:'power3.Out', stagger:0.1}, '-=0.5');
			return timeline;
		},
		timelineLeave: () => {
			let timeline = new gsap.timeline({paused:true});
			timeline.fromTo($('.transition-layer'), {x:'-100%'},{duration:1, x:'0%', ease:'power3.inOut'});
			return timeline;
		}
	}
};

export default pjaxConfig;