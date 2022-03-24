let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let textName = document.getElementById('textName');
let aboutMe = document.getElementById('aboutMe');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');

function clickOpen() {
  console.log('Мы кликнули по элементу Open');
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  popup.classList.add('popup_opened');
}

function clickClose() {
  console.log('Мы кликнули по элементу Close');
  popup.classList.remove('popup_opened');
}

function addProfile(popup) {
  popup.preventDefault();
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
  clickClose();
};

editButton.addEventListener('click', clickOpen);
closeButton.addEventListener('click', clickClose);
popup.addEventListener('submit', addProfile);