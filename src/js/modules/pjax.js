export default class Pjax{
	constructor(config){
		this.$links = $('.pjax-link');
		this.isClickable = true;
		this.config = config;

		this.bindEvents();
	}


	bindEvents(){
		this.$links.on('click', this.onClick.bind(this));
		window.addEventListener('popstate', this.changePage.bind(this));
	}

	onClick(e){
		e.preventDefault();
		if(this.isClickable){
			this.isClickable = false;
			let $currentTarget = $(e.currentTarget);
			let url = $currentTarget.attr('href');
			this.loadPage(url, true, $('.pjax-wrapper').data('page'));
		}
	}

	changePage(e){
		this.loadPage(location.href, false, $('.pjax-wrapper').data('page'));
	}

	loadPage(url, push, pageId){
		let timelineLeave = this.config[pageId].timelineLeave($('.pjax-wrapper'));
		$.get(url, (data) => {
			let $newTitle = $(data).find('title');
			let $newPage = $(data).find('.pjax-wrapper');
			let newPageId = $newPage.data('page');

			timelineLeave.eventCallback('onStart', () => {
			});

			timelineLeave.eventCallback('onComplete', () => {
				window.scrollTo(0, 0);
				this.updateBgClass(this.config[newPageId].bgClass)
				let timelineEnter = this.config[newPageId].timelineEnter($newPage);
				$(".pjax-wrapper").replaceWith($newPage);
				$(document).trigger('pjax:pageLoaded');

				if(push){
					history.pushState(null, $newTitle, url)
				}

				timelineEnter.eventCallback('onComplete', () => {
					this.isClickable = true;
				});

				timelineEnter.play()

			});
			timelineLeave.play();

		}).fail((e) => {
			console.log(e);
		})

	}

	updateBgClass(cssClass){
		$('body').removeClass((index, css) => {
			return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
		});
		$('body').addClass(cssClass);
	}

}