export class Timer {
    constructor(element) {
        this.element = element;
        this.time = 0;
        this.interval = null;
    }

    start() {
        this.countUp();
        this.interval = setInterval(() => {
            this.countUp();
        }, 1000);
    }

    format() {
        var seconds = (this.time % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var minutes = Math.floor(this.time / 60);
        if (minutes >= 60) {
            var hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }

    countUp() {
        this.time++;
        this.element.innerHTML = this.format();
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.time = 0;
        this.element.innerHTML = this.format();
    }
}