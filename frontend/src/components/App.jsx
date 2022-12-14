import { api } from '../utils/Api';
import * as auth from '../utils/Auth';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { Login } from './Login';
import { Register } from './Register';
import { Popup } from './Popup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ImagePopup } from './ImagePopup';
import { InfoTooltip } from './InfoTooltip';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isPendingResponse, setIsPendingResponse] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((e) => console.log(e));
  }, [isLoggedIn]);

  async function tokenCheck() {
    try {
      const res = await auth.getContent();
      if (res.email) {
        setIsLoggedIn(true);
        setUserEmail(res.email);
        history.push('/');
      }
    } catch (err) {
      setIsLoggedIn(false);
      history.push('/signin');
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setUserEmail(res.email);
        history.push('/');
      })
      .catch((error) => {
        setIsInfoTooltipOpened(true);
        console.log(error);
      });
  }

  function handleLogIn(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        console.log(res);
        setUserEmail(res.email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((error) => {
        setIsInfoTooltipOpened(true);
        console.log(error);
      });
  }

  function handleSignOut() {
    auth
      .logout()
      .then(() => {
        history.push('/signin');
        setIsLoggedIn(false);
        setUserEmail('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item === currentUser._id);

    if (!isLiked) {
      try {
        const res = await api.addLike(card._id);
        setCards((prevState) => prevState.map((item) => (item._id === card._id ? res : item)));
      } catch (error) {
        console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
      }
    } else {
      try {
        const res = await api.removeLike(card._id);
        setCards((prevState) => prevState.map((item) => (item._id === card._id ? res : item)));
      } catch (error) {
        console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
      }
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((prevState) => prevState.filter((item) => card._id !== item._id));
    } catch (error) {
      console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpened(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  async function handleUpdateUser(userInfo) {
    setIsPendingResponse(true);
    try {
      const res = await api.setUserInfo(userInfo);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
    } finally {
      setIsPendingResponse(false);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  async function handleUpdateAvatar({ avatar }) {
    setIsPendingResponse(true);
    try {
      const res = await api.changeAvatar({ avatar });
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
    } finally {
      setIsPendingResponse(false);
    }
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  async function handleAddPlaceSubmit(data) {
    setIsPendingResponse(true);
    try {
      const res = await api.addNewCard(data);
      setCards([res, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(`??????, ?? ?????? ?????? ???????????? ${error}. ????????????????.`);
    } finally {
      setIsPendingResponse(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <main className='content'>
          <Switch>
            <Route path='/signin'>
              <Login
                isPending={isPendingResponse}
                onLogIn={handleLogIn}
              />
            </Route>
            <Route path='/signup'>
              <Register
                isPending={isPendingResponse}
                onRegister={handleRegister}
              />
            </Route>
            <ProtectedRoute
              exact
              path='/'
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />
          </Switch>
        </main>
        <Footer />
        {/* <!-- ?????????? ???????????????????????????? ?????????????? --> */}
        <EditProfilePopup
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPending={isPendingResponse}
          isOpen={isEditProfilePopupOpen}
        />
        {/* <!-- ?????????? ???????????????????? ???????????????? --> */}
        <AddPlacePopup
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isPending={isPendingResponse}
          isOpen={isAddPlacePopupOpen}
        />
        {/* <!-- ?????????? ???????????????????????????? ?????????????? --> */}
        <EditAvatarPopup
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPending={isPendingResponse}
          isOpen={isEditAvatarPopupOpen}
        />

        <Popup
          name='image'
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        >
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </Popup>

        <Popup
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
        >
          <InfoTooltip
            isOpen={isInfoTooltipOpened}
            onClose={closeAllPopups}
            isError={!isLoggedIn}
          />
        </Popup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
