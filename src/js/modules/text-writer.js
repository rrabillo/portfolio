export default class TextWriter{

    constructor(element) {

        this.$wrapper = element;

        this.delay = 3000
        this.words = [
            'Wordpress',
            'GSAP',
            'Contao',
            'Javascript',
            'PhaserJS',
            'PixiJS',
        ]
        this.index = 0;
        this.interval;
        this.timeout;
        this.writeText();
    }

    updateIndex(){
        if(this.index === this.words.length - 1){
            this.index = 0;
        }
        else{
            this.index += 1;
        }
    }

    writeText(){
        clearTimeout(this.timeout);

        let wordLength = this.words[this.index].length;
        let charIndex = 0;

        this.$wrapper.text('');

        this.interval = setInterval(() => {
            if(charIndex === wordLength){
                clearInterval(this.interval);
                this.timeout  = setTimeout(() => {
                    this.updateIndex();
                    this.writeText();
                }, this.delay)
            }
            else{
                this.$wrapper[0].innerHTML += this.words[this.index].charAt(charIndex);
                charIndex += 1;
            }
        }, 100)
    }



}