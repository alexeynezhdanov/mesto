let editButton = document.querySelector('.profile__profile-info_edit-name_edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');
let textName = document.getElementById('textName');
let aboutMe = document.getElementById('aboutMe');
let profileName = document.querySelector('.profile__profile-info_edit-name_name');
let profileAboutMe = document.querySelector('.profile__profile-info_about-me');

function clickOpen() {
  console.log('Мы кликнули по элементу Open');
  popup.classList.add('popup_opened');
  textName.placeholder = profileName.textContent;
  aboutMe.placeholder = profileAboutMe.textContent;
}

function clickClose() {
  console.log('Мы кликнули по элементу Close');
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', clickOpen);
editButton.addEventListener('click', clickOpen);
closeButton.addEventListener('click', clickClose);

function addProfile() {
  if (textName.value !== '' && aboutMe.value === '')
  {
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.placeholder;
  }
  else if (textName.value === '' && aboutMe.value !== '')
  {
  profileName.textContent = textName.placeholder;
  profileAboutMe.textContent = aboutMe.value;
  }
  else if (textName.value !== '' && aboutMe.value !== '')
  {
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
    }
    console.log(textName.value);
    console.log(profileName.textContent);
  }

saveButton.addEventListener('click', addProfile);
saveButton.addEventListener('click', clickClose);