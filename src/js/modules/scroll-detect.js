export default class ScrollDetect{

    constructor() {
        this.last = Date.now();
        this.now = Date.now();
        this.lastScrollTop = $(document).scrollTop();
        this.currScrollTop = $(document).scrollTop();
        this.isEventEmitable = false;

        this.raf = requestAnimationFrame(this.update.bind(this));
    }

    update(){
        this.now = Date.now();
        this.currScrollTop = $(document).scrollTop();
        if(this.currScrollTop === this.lastScrollTop){
            this.isScrolling = false;
            if(this.isEventEmitable){
                $(document).trigger('scrolldetect:stop');
                this.isEventEmitable = false;
            }
        }
        else{
            this.isScrolling = true;
            this.isEventEmitable = true;
            $(document).trigger('scrolldetect:scroll');
        }
        if((this.last + 100) <= this.now){
            this.last = this.now;
            this.lastScrollTop  = this.currScrollTop;
        }
        this.raf = requestAnimationFrame(this.update.bind(this));
    }

}