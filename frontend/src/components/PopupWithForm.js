function PopupWithForm({ name, isOpen, onClose, nameForm, onSubmit, title, children, buttonText}) {
  
  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened' }`}>
      <div className="popup__container">
        <button className="popup__close" type="reset" aria-label="закрыть" onClick={onClose}></button>
        <form name={nameForm} className="popup__form"  onSubmit={onSubmit} >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save" type="submit" aria-label={buttonText}>{buttonText}</button>
        </form>
      </div>
  </section>
  );
}

export default PopupWithForm;