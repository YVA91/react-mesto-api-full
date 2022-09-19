import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useForm } from '../hooks/useForm.js';

function EditProfilePopup({ isOpen, onUpdateUser, onClose, isLoading }) {
  const { values, handleChange, setValues } = useForm({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about })
  }, [currentUser, isOpen]);
  
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: values.name, 
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      nameForm="profile"
      name = "new-name"
      isOpen = {isOpen}
      onClose = {onClose}
      title = "Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit = {handleSubmit}>
        
      <fieldset className="popup__form-item">
        <label className="popup__field">
          <input 
            name="name"
            className="popup__field-item" 
            id="name" 
            type="text"  
            value={values.name || ""} 
            required
            minLength="2"
            maxLength="60"
            placeholder="Имя"
            onChange={handleChange} />
          <span className="popup__field-item-error" id="name-error"></span>
        </label>
        <label className="popup__field">
          <input 
            name="about"
            className="popup__field-item" 
            id="job" 
            type="text"  
            value={values.about  || ""} 
            minLength="2"
            maxLength="60"
            placeholder="О себе"
            required
            onChange={handleChange}/>
          <span className="popup__field-item-error popup__field-item-error_visible" id="job-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;