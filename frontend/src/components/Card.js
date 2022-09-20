import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`photo__remove ${isOwn ? '' : 'photo__remove_inactive'}`);
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`photo__item-like ${isLiked ? 'photo__item-like_actve' : ''}`);

  function handleClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }  

  function handleCardDelete() {
    onCardDelete(card);
  }  

  return (
    <li className="photo__item">
      <img className="photo__item-img" 
        src={card.link} 
        alt={card.name} 
        onClick={handleClick}
      />
      <button className={cardDeleteButtonClassName} type="button" aria-label="удалить фото" onClick={handleCardDelete}></button>
      <div className="photo__item-signature">
        <h2 className="photo__item-title">{card.name}</h2>
        <div className="photo__likes-conteiner">
          <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick}></button>
          <p className="photo__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card; 