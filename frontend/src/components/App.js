import { useState, useEffect}from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, BrowserRouter, useHistory, withRouter } from 'react-router-dom';
import ImgOk from '../images/infotoolOk.png'
import ImgBad from '../images/infotoolBad.png'
import * as Auth from '../utils/Auth.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isStatusRegister, setIsStatusRegister] = useState(false)
  const history = useHistory(); 
  const [headerUresEmail, setHeaderUresEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCreateCard()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect (() => {
    tokenCheck()
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick (card) {
    setSelectedCard (card)
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen (false)
    setIsAddPlacePopupOpen (false)
    setIsEditAvatarPopupOpen (false)
    setIsInfoToolTipPopupOpen(false)
    setSelectedCard({})
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link
  useEffect(() => {
    function closeByEscapeAndOverlay(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
      if (evt.target.classList.contains('popup')) {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscapeAndOverlay);
      document.addEventListener("mousedown", closeByEscapeAndOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscapeAndOverlay);
        document.removeEventListener("mousedown", closeByEscapeAndOverlay);
      }
    }
  }, [isOpen]) 

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.patchUserInfo(data.name, data.about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setIsLoading(false)
    });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.patchUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.postNewPhoto(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeStatus = isLiked ? api.deleteLike(card._id) : api.putLike(card._id)
    likeStatus.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deletePhoto(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSubmitRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        console.log(res)
      if (res) {
        setLoggedIn(true)
        history.push('/sign-in')
        setIsStatusRegister(true)
      }
    })
    .catch((err) => {
      setIsStatusRegister(false)
      console.log(err)
    })
    .finally(() => {
      setIsInfoToolTipPopupOpen(true)
    });
  }

  function handleSubmitAuthorize (email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setHeaderUresEmail(email)
          setLoggedIn(true)
          history.push("/")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  function tokenCheck() {
    const token = localStorage.getItem('jwt')
    if (token) {
      Auth.getContent(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true)
            setHeaderUresEmail(data.data.email)
            history.push("/")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function removeToken() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header userEmail={headerUresEmail} onReoveToken={removeToken} />
      <Switch>
      <ProtectedRoute
        component={Main}
        onEditAvatar = {handleEditAvatarClick} 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
        loggedIn={loggedIn}
        exact path="/"/>
        <Route path="/sign-in">
          <Login
            title="Вход"
            buttonText="Войти"
            onAuthorize={handleSubmitAuthorize}/>
        </Route>
        <Route path="/sign-up">
          <Register
            title="Регистрация"
            buttonText="Зарегистрироваться"
            onRegister={handleSubmitRegister} />
        </Route>
      </Switch>
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}/> 

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}/>

      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}/>

      <PopupWithForm
        name = "confirm"
        onClose = {closeAllPopups}
        title = "Вы уверены?"
        buttonText = "Да"/>

      <ImagePopup
        onClose = {closeAllPopups}
        card={selectedCard} />
  
      <InfoTooltip
      name="infotooltip"
      onClose = {closeAllPopups}
      isOpen={isInfoToolTipPopupOpen}
      isStatus={isStatusRegister}
      textOk="Вы успешно зарегистрировались!"
      textBad="Что-то пошло не так! Попробуйте ещё раз."
      ImgOk={ImgOk}
      ImgBad={ImgBad}
      AltOk="Галочка"
      AltBad="Крестик"
      />

      <Footer/>
    </CurrentUserContext.Provider>
  );
}

export default App;
