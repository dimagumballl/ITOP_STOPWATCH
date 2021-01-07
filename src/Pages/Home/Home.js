import React from 'react';
import Stopwatch from '../../JScomponents/stopwatch/Stopwatch'
import './Home.css'


function Home() {
  return (
    <div className="Home">
        <Stopwatch />
        <div>
          Иза того что я уже вам делал именно это тестовое задание (на позицию мидл)
          то здесь я решил добавитьеще коечто от себя (а именно улучшенный секундомер, и сапер с таймером)
          просто сдавать одно и тоже как-то не культурно и при попытке связатся с HR у меня не получилось дозвонится
          и так вышло что когда ко мне звонили я не мог взять трубку.
          Если вас интересует только сам Секундомер (ТЗ) то переходите по пути src/JScomponents/stopwatch/stopwatch
          Сам он вызывается с Компонента Home
        </div>
    </div>
    
  );
}

export default Home;
