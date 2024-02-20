import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('.start-button');
const timerSeconds = document.querySelector(`[data-seconds]`);
const timerMinutes = document.querySelector(`[data-minutes]`);
const timerHours = document.querySelector(`[data-hours]`);
const timerDays = document.querySelector(`[data-days]`);
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = Date.now();
    if (selectedDates[0] < date) {
      iziToast.show({
        title: 'Error',
        titleColor: '#ffffff',
        iconUrl: './img/javascript.svg#icon-error',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
        position: 'topRight',
        pauseOnHover: false,
      });
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
  }

  startTimer() {
    const datePick = new Date(input.value).getTime();
    this.interval = setInterval(() => {
      const currentDate = Date.now();
      const subtraction = datePick - currentDate;
      const convertDate = this.convertMs(subtraction);
      if (convertDate <= 0) {
        this.stopTimer();
      }
      this.onTick(convertDate);
    }, 1000);
    startButton.disabled = true;
    input.disabled = true;
  }

  stopTimer() {
    clearInterval(this.interval);
    startButton.disabled = false;
    input.disabled = false;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function updateTime({ days, hours, minutes, seconds }) {
  timerSeconds.textContent = seconds;
  timerMinutes.textContent = minutes;
  timerHours.textContent = hours;
  timerDays.textContent = days;
}

const timer = new Timer({
  onTick: updateTime,
});

startButton.addEventListener('click', () => timer.startTimer());
