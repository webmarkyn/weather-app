const openPopup = (popup) => {
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
};

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
