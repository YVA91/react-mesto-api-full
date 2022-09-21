function InfoTooltip({ name, isOpen, onClose, isStatus, ImgOk, ImgBad, AltOk, AltBad, textOk, textBad}) {
return (
  <section className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
    <div className="popup__container infotooltip">
      <button className="popup__close" type="reset" aria-label="закрыть" onClick={onClose}></button>
      <img className="infotooltip__img" 
        src={isStatus ? ImgOk : ImgBad }
        alt={isStatus ? AltOk : AltBad }
      />
      <h2 className="infotooltip__title">{isStatus ? textOk : textBad }</h2>
    </div>
  </section>
);
}

export default InfoTooltip;