'use stricts'

refs = {
    dayValue: document.querySelector('.value[data-value="days"]'),
    hourValue: document.querySelector('.value[data-value="hours"]'),
    minutValue: document.querySelector('.value[data-value="mins"]'),
    secondValue: document.querySelector('.value[data-value="secs"]')
}

class CountdownTimer {
    constructor({ onTick, targetDate }) {
        this.onTick = onTick;
        this.targetDate = targetDate;
    }
    start() {
        const dedlineTime = this.targetDate;
        setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = dedlineTime - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time)
        }, 1000);
    }
    getTimeComponents(time) {
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

        return { days, hours, mins, secs }
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new CountdownTimer({
    onTick: updateClock,
    targetDate: new Date('Nov 21, 2021'),
})

timer.start();

function updateClock({ days, hours, mins, secs }) {
    refs.dayValue.textContent = days;
    refs.hourValue.textContent = hours;
    refs.minutValue.textContent = mins;
    refs.secondValue.textContent = secs;
}
