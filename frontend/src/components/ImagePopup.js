function ImagePopup({ card, onClose}) {
  return (
    <section className={`popup popup_open-photo ${card.link && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button 
          className="popup__close popup__close_img" 
          type="reset" 
          aria-label="закрыть"
          onClick={onClose}
          ></button>
          <img 
          className="popup__item-img" 
          src={card.link} 
          alt={card.name}  
        />
        <figcaption>
          <h2 className="popup__item-title">{card.name}</h2>
        </figcaption>
      </figure>
    </section>
    );
  }
  
export default ImagePopup;
  