import React from 'react';
import Caption from '../Caption/Caption';
import photo from '../../../images/photo_myself.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section id="student" className="myself">
      <Caption name={"Студент"} />
      <div className="myself__info">
        <div className="myself__text">
          <h4 className="myself__name">Виктория</h4>
          <p className="myself__profile">Фронтенд-разработчик, 32 года</p>
          <p className="myself__about">
						Я родилась в Ростовской области, последние 10 лет живу в Ростове-на-Дону, закончила экономический факультет ЮРГУЭС.
						У меня есть муж и дочь. Я люблю слушать музыку, а ещё увлекаюсь спортом. Работаю менеджером B2C. Недавно начала кодить.
						После того, как закончу курс по веб-разработке, продолжу развивать навыки по написанию кода и начну искать работу web-разработчиком.
					</p>
          <nav className="myself__link">
            <a href="https://github.com/Viki-B90" target="_blank" className="myself__link-git" rel="noreferrer">Github</a>
          </nav>
        </div>
        <img src={photo} alt="Фотография" className="myself__photo" />
      </div>
    </section>
  )
}

export default AboutMe;
