import { errorPopup } from "./dom";

const openPopup = (popup) => {
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
};

export const showError = (error) => {
  console.log(errorPopup.getElementsByClassName('errorPopup').textContent);
  errorPopup.childNodes[1].textContent = error;
  errorPopup.classList.add('active');
  setTimeout(() => errorPopup.classList.remove('active'), 5000);
}

const closePopup = (popup) => new Promise((resolve) => {
  popup.style.opacity = '0';
  const trans = () => {
    popup.style.visibility = 'hidden';
    popup.removeEventListener('transitionend', trans);
    resolve();
  };
  popup.addEventListener('transitionend', trans);
});

export { openPopup, closePopup };
