import React from 'react';
import{Route} from "react-router-dom"
import Home from '../../Pages/Home/Home'
import Stopwatchpro from '../../Pages/Stopwatchpro/Stopwatchpro'
import SapperPage from '../../Pages/SapperPage/SaperPage'

function MeinMenu() {
  return (
    
    <div className="MeinManu">
      {
        /*
          Иза того что я уже вам делал именно это тестовое задание (на позицию мидл)
          то здесь я решил добавитьеще коечто от себя (а именно улучшенный секундомер, и сапер с таймером)
          просто сдавать одно и тоже как-то не культурно и при попытке связатся с HR у меня не получилось дозвонится
          и так получилось что когда комне звонили я немог взять трубку ну и праздники начались.
          если вас интересует только сам Секундомер (ТЗ) то переходите по пути src/JScomponents/stopwatch/stopwatch
          Сам он вызывается с Компонента Home
        */
      }
        <Route exact path="/" render={()=>(<Home/>)//тут ТЗ
      }/>
        <Route path="/stopwatchpro" render={Stopwatchpro}/>
        <Route path="/sapper" render={SapperPage}/>
        
    </div>
    
  );
}

export default MeinMenu;
