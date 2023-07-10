import React from 'react';
import Caption from '../Caption/Caption';
import './AboutProject.css';

function AboutProject() {
  return (
    <section id="project" className="project">
      <Caption name={"О проекте"} />
      <section className="project__info">
        <div className="project__paragraph">
          <p className="project__header">Дипломный проект включал 5 этапов</p>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__paragraph">
          <p className="project__header">На выполнение диплома ушло 5 недель</p>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </section>
      <section className="project__progressbar">
        <div className="project__column project__column_color_green">
          <span className="project__progressbar-green">1 неделя</span>
          <span className="project__progressbar-text">Back-end</span>
        </div>
        <div className="project__column project__column_color_white">
          <span className="project__progressbar-white">4 недели</span>
          <span className="project__progressbar-text">Front-end</span>
        </div>
      </section>
    </section>
  )
}

export default AboutProject;
