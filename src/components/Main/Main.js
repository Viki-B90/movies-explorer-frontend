import React from 'react';
import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';
import Footer from '../Footer/Footer';
import './Main.css';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <Header color={'header__theme_black'} location={"/"}>
          <MoviesHeader />
        </Header>
        ) : (
        <Header color={'header__theme_black'} location={"/"}>
          <MainHeader />
        </Header>
      )}
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}

export default Main;
