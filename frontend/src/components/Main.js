import { useContext} from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
 
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-conteiner">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватарка" />
          <button className="profile__avatar-edit" type="button" aria-label="изменить" onClick={onEditAvatar}></button>
        </div>
        <div>
          <div className="profile__name-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить" onClick={onAddPlace}></button>
      </section>

      <section>
        <ul className="photo">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />)
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;