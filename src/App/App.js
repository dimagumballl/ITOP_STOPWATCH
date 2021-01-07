import React from 'react';
import MeinMenu from '..//layouts/MeinMenu/MeinMenu'
import '../common/style/main.css'
import Header from '../layouts/Header/Header'


function App() {
  return (
    <div>
      <Header/>
      <MeinMenu/>{//Здесь вызываем все наши компоненты
      }
      
    </div>
    
  );
}

export default App;
