import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, isLoading }) {
  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value=""
  })

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  } 
  
  return (
    <PopupWithForm
      nameForm="avatar"
      name = "new-avatar"
      isOpen={isOpen}
      onClose={onClose}
      title = "Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>

      <fieldset className="popup__form-item">
        <label className="popup__field">
          <input 
            className="popup__field-item" 
            id="avatar" 
            type="url" 
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}/>
          <span className="popup__field-item-error" id="avatar-error"></span>
      </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;