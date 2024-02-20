import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function getDelayFromInput(form) {
  const delayValue = form.delay.value;
  return delayValue;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = getDelayFromInput(event.currentTarget);
  const promise = new Promise((resolve, reject) => {
    if (form.state.value === 'fulfilled') {
      resolve(`✅ Fulfilled promise in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise in ${delay}ms`);
    }
  });
  promise
    .then(value =>
      setTimeout(() => {
        iziToast.show({
          message: value,
          messageColor: '#ffffff',
          position: 'topRight',
          backgroundColor: '#59A10D',
        });
      }, delay)
    )
    .catch(error => {
      setTimeout(() => {
        iziToast.show({
          message: error,
          messageColor: '#ffffff',
          position: 'topRight',
          backgroundColor: '#EF4040',
        });
      }, delay);
    });
});
