import React,{Component} from 'react'
import { Observable } from 'rxjs';
import './Sapper.css'
import './ButDecor.css'

/**
 * Сапер
 * 
 * Код с для таймера такойже как и в секундомере
 * 
 */

class Sapper extends Component{

    state={
        SpaseLeft:"",//Для отслеживания прогреса к победе
        textSize:"",// размер поля в квдрате
        textBomb:"",// количество бомб
        atantion:"Classnone",// клас для всплывающих окон
        Array:[],//поле
        firstClick: true,//самый первый клик на поле
        doubleclick:false,//слежка для дблклик
        //для выбора финального сценария
        win:false,
        faile:false,
        //для таймера
        hour:0,
        min: 0,
        second: 0,
        fid:0,
        list:[],
        StartStop: "START",
    }

    

    ComandWatch=(Comand)=>{// controler for more comfortable using timer (Для удбства работы с методом Time())
        if(Comand==="START"){ // if Comand=="START" we jast starting timer (если Comand=="START" просто запускаем таймер)
         this.Timer(Comand)
        }
        else if(Comand==="STOP"){// if "STOP" we are stoping timer and make time=0 (если "STOP" стоп мы обнуляем и останавливаем тамер)
          this.Timer(Comand)
          this.setState({
            hour:0,
            min: 0,
            second: 0,
            StartStop: "START",
            
            
        });
        }
        
      }
      Timer=(Comand)=>{//Timer
        if(Comand==="START"){//if START(это для START)
          this.setState({
            StartStop: "STOP" //if StartStop=="STOP" timer is runing(если StartStop=="STOP" таймер идет)
          })
          setTimeout(()=>this.Timer(null), 1);// and we restart timer with Comand=null ( и перезапускается с параметром Comand=null)
        }
        else if (Comand === null){//if Comand null it's meen thet one comand was activete( Если Comand=null, это значит что таймер либо работает либо одна с команд была активирована)
          if(this.state.StartStop==="STOP"){//if StartStop="STOP" timer is working(если StartStop="STOP" то таймер в стационарном робочем режиме)
    // here we have manipulations with time(тут мы делаем счет времени)
            if(this.state.min>=59){
              this.setState((prevstate) => {
                return {
                  min: 0,
                  hour:prevstate.hour+1
                };
              });
            }
            else{
              if(this.state.second>=100){
                this.setState((prevstate) => {
                  return {
                    second: 0,
                    min:prevstate.min+1
                  };
                });
              }
              else {
                this.setState((prevstate) => {
                  return {
                    second: prevstate.second+1
                  };
                });
              }
            }
            
            const source = Observable.create((observer) => {// here we restar timer and try to catch err, it was part of task(тут перезапускаем таймер и ловим ошибки)
              
              const timer = setTimeout(() => {
                  this.Timer(null)
              }, 1);
          
              return () => {
                
                  clearInterval(timer);
              } 
          });
          const subscription = source.subscribe(
            val => console.log('next:', val),
            err => console.error('error:', err),
            () => console.log('completed')
          )
          setTimeout(() => subscription.unsubscribe(), 4500); 
          }
        }
      }
      
    Save=()=>{
        if(this.state.win){
            this.setState((prevstate) => {
                return {
                  
                  list:[
                    ...prevstate.list,
                        {
                            time:prevstate.hour+":"+prevstate.min+":"+prevstate.second+" ПОБЕДА "+this.state.textSize+"x"+this.state.textSize+" БОМБ "+this.state.textBomb
                        }
                    ]
                };
              });
        }
        else{
            this.setState((prevstate) => {
                return {
                  
                  list:[
                    ...prevstate.list,
                        {
                            time:prevstate.hour+":"+prevstate.min+":"+prevstate.second+" ПРОИГРЫШ "+this.state.textSize+"x"+this.state.textSize+" БОМБ "+this.state.textBomb
                        }
                    ]
                };
              });
        }
        
    }    



    tapS=(e)=>{//Здесь мы вводим размер
        
            this.setState({ 
                textSize:e.target.value
            });
            if(this.state.textSize<0)
                this.setState((prevstate) => {//Следим чтобы размер не становился меньше 0
                    return {
                        textSize:0
                    };
                });
    }
    tapB=(e)=>{//Здесь количество бомб
        
            this.setState({ 
                textBomb:e.target.value
            });
            if(this.state.textBomb<0)
                this.setState((prevstate) => {//Следим чтобы колчество бомб не становилось меньше 0
                    return {
                        textBomb:0
                    };
                });
    }
    Create2DArray(rows) {//Создаем дбл Массив
        var arr = [];
      
        for (var i=0;i<rows;i++) {
           arr[i] = [];
        }
      
        return arr;
      }
    CreateArray=()=>{//Создаем поле
        if(this.state.textSize>15||this.state.textSize<5||this.state.textSize===NaN)
        {//Проверка поле недолжно быть больше 15 и меньше 5
            this.setState({ 
                atantion:"row_Array_atantion"
            });
        }
        else if(this.state.textBomb>this.state.textSize*this.state.textSize/2||this.state.textBomb===NaN||this.state.textBomb===0){
            this.setState({ //Количество бомб недолжно быть больше this.state.textSize/2 и не 0
                atantion:"row_Array_atantion"
            });
        }
        else{//если все условия соблюдены то мы создаем поле но не заполняем бомбами
            this.setState({ 
                atantion:"Classnone"
            });
            let arry = this.Create2DArray(this.state.textSize)
            
            
            for(let i = 0 ;i<this.state.textSize;i++)
                for(let a = 0 ;a<this.state.textSize;a++)
                    arry[i][a]={//параметры клетки
                        //кординаты клетки
                        y:i,
                        x:a,
                        
                        Bomb:false,//наличие бомбы
                        Number:0,//кличество бомб вокруг
                        CanBeBomb:true,//можеь ли быть бомбой (только для первого нажатия по полю)
                        ClassB:"but",//графическое отображения кнопки
                        count:0,
                        Flag:false,//флажок для сапера
                        Mis:false
                    }
            this.setState({//обнуляем все значения на тот случай если до этого мы уже создавали игру
                        //и могли нормально начать сначала
                Array:arry,
                firstClick:true,
                SpaseLeft:"",
                faile:false,
                win:false,
                
            });
            this.ComandWatch("STOP")//останавливаем таймер если мы пересоздаем игру
            
            
        }
    }
    
    ClickOnBut=(y, x)=>//здесь мы отслеживаем нажатия по кнопкам
    {   
        if(!this.state.doubleclick){//здесь мы проверяем дбл клик
            this.setState({ 
                doubleclick:true,
            });
            setTimeout(() => { // принажатии doubleclick:true
                if(this.state.doubleclick){//если в течении 200 млсек небудет еще одного нажатия 
                                            //то дбл клик не защитается 
                                            //и будет выполнена обычная проверка ячейки
                                            //Проверка
                    let arry=this.state.Array
                    if(this.state.firstClick){//проверка на первый клик по полю
                        arry[y][x].CanBeBomb=false
                        arry[y][x].ClassB="butCliked"
                        this.CreateBomb(arry)//если это самый первый килк по полю то запускается CreateBomb() 
                                                //прейдите чтобы глянуть
                    }
                    else{
                        if(!this.state.win){//если єто не первый клик то идет проверка на победу и пражения
                            if(!this.state.faile){// если инрок выиграл либо проиграл его клики уже не засчитыватся
                                if(arry[y][x].Bomb){//дальше если кнопка бомба
                                    arry[y][x].ClassB="butBomb"//ну она отображается как бомба
                                    for(let i = 0 ;i<this.state.textSize;i++)// открывается сразу все поле
                                        for(let a = 0 ;a<this.state.textSize;a++)
                                            if(arry[i][a].Bomb)
                                                arry[i][a].ClassB="butBomb"
                                            else{
                                                arry[i][a].ClassB="butCliked"
                                            }
                                    this.setState({ //засчитыватся поражения
                                        Array:arry,
                                        faile:true
                                    });
                                    this.Save()//записывает ваш результат
                                    this.ComandWatch("STOP")//и стопит таймер
                                    
                                }
                                else if(arry[y][x].Flag){//если стоит флажок то он просто снимается 
                                    arry[y][x].ClassB="but"
                                    arry[y][x].Flag=false
                                    this.setState({ 
                                        Array:arry,
                                    });
                                }
                                else{
                                    if(arry[y][x].ClassB!=="butCliked"){//если SpaseLeft===1
                                        arry[y][x].ClassB="butCliked"//то это последняя свободная клетка в целом
                                        if(this.state.SpaseLeft===1){// и засчитыватся победа
                                            this.setState((prevstate) => {
                                                return {
                                                    win:true,
                                                    Array:arry,
                                                    SpaseLeft:prevstate.SpaseLeft-1
                                                };
                                            });
                                            this.Save()//сейв результат
                                            this.ComandWatch("STOP")//стоп таймер
                                            
                                        }
                                            
                                        else{//если не то ни другое 
                                            this.setState((prevstate) => {// то квадратик просто отображается как 
                                                return {// нажатый, и выводит весь текст 
                                                    Array:arry,
                                                    SpaseLeft:prevstate.SpaseLeft-1
                                                };
                                            });
                                        } 
                                    }
                                    
                                       
                                }
                            }
                        }
                        
                    }
                    this.setState({ 
                        doubleclick:false,
                    });
                }
          }, 200)
        }
        else{//но если всетаки в течении 200 млсек был нажат клик еще раз
                let arry=this.state.Array// то активируется дбл клик и ставится флажок
                if(this.state.firstClick){//правда если ячейка уже была нажата то флажок не ставится
                    arry[y][x].CanBeBomb=false//и еще если это первое нажатия просто жмется кнопка
                    arry[y][x].ClassB="butCliked"
                    this.CreateBomb(arry)
                }
                else{
                    if(arry[y][x].ClassB!=="butCliked"){
                        arry[y][x].ClassB="butFlag"
                        arry[y][x].Flag=true
                        if(!arry[y][x].Bomb)
                            arry[y][x].Mis=true
                        this.setState({ 
                            Array:arry,
                            doubleclick:false,
                        });
                    }
                }
        }    
        
    }

    CreateBomb=(arry)=>{//Создания бомб на поле активируется при первом клике
        let y
        let x
        for(let i = 0 ;i<this.state.textBomb;i++){//рандомно выбирается кординаты 
            y=Math.floor(Math.random() * Math.floor(this.state.textSize));
            x=Math.floor(Math.random() * Math.floor(this.state.textSize));
            if(arry[y][x].Bomb||!arry[y][x].CanBeBomb)//и ставится бомба, правда в том случае
                i--;                                    // когда эта кордината не занята и CanBeBomb===true(такое есть только у самой первой ячейки которую нажмут)
            else
                {
                    arry[y][x].Bomb=true
                    if(x>0&y>0&y<this.state.textSize-1&x<this.state.textSize-1){//Дальше идет проверка всех бомб в
                        arry[y][x+1].Number=arry[y][x+1].Number+1               //округе добавляется к их Number+1
                        arry[y][x-1].Number=arry[y][x-1].Number+1               
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1

                        arry[y+1][x+1].Number=arry[y+1][x+1].Number+1
                        arry[y-1][x+1].Number=arry[y-1][x+1].Number+1

                        arry[y-1][x-1].Number=arry[y-1][x-1].Number+1
                        arry[y+1][x-1].Number=arry[y+1][x-1].Number+1
                    }
                    else if(x===0&y>0&y<this.state.textSize-1&x<this.state.textSize-1){
                        arry[y][x+1].Number=arry[y][x+1].Number+1
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1
                        arry[y+1][x+1].Number=arry[y+1][x+1].Number+1
                        arry[y-1][x+1].Number=arry[y-1][x+1].Number+1
                    }
                    else if(x>0&y>0&y<this.state.textSize-1&x===this.state.textSize-1){
                        arry[y][x-1].Number=arry[y][x-1].Number+1
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1
                        arry[y-1][x-1].Number=arry[y-1][x-1].Number+1
                        arry[y+1][x-1].Number=arry[y+1][x-1].Number+1
                    }
                    else if(x>0&y===0&y<this.state.textSize-1&x<this.state.textSize-1){
                        arry[y][x+1].Number=arry[y][x+1].Number+1
                        arry[y][x-1].Number=arry[y][x-1].Number+1
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y+1][x-1].Number=arry[y+1][x-1].Number+1
                        arry[y+1][x+1].Number=arry[y+1][x+1].Number+1
                    }
                    else if(x>0&y>0&y===this.state.textSize-1&x<this.state.textSize-1){
                        arry[y][x+1].Number=arry[y][x+1].Number+1
                        arry[y][x-1].Number=arry[y][x-1].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1
                        arry[y-1][x+1].Number=arry[y-1][x+1].Number+1
                        arry[y-1][x-1].Number=arry[y-1][x-1].Number+1
                    }
                    else if(x===0&y===0&y<this.state.textSize-1&x<this.state.textSize-1){
                        arry[y][x+1].Number=arry[y][x+1].Number+1
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y+1][x+1].Number=arry[y+1][x+1].Number+1
                    }
                    else if(x>0&y>0&y===this.state.textSize-1&x===this.state.textSize-1){
                        arry[y][x-1].Number=arry[y][x-1].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1
                        arry[y-1][x-1].Number=arry[y-1][x-1].Number+1
                    }
                    else if(x===0&y>0&y===this.state.textSize-1&x<this.state.textSize-1){
                        arry[y][x+1].Number=arry[y][x+1].Number+1
                        arry[y-1][x].Number=arry[y-1][x].Number+1
                        arry[y-1][x+1].Number=arry[y-1][x+1].Number+1
                    }
                    else if(x>0&y===0&y<this.state.textSize-1&x===this.state.textSize-1){
                        arry[y][x-1].Number=arry[y][x-1].Number+1
                        arry[y+1][x].Number=arry[y+1][x].Number+1
                        arry[y+1][x-1].Number=arry[y+1][x-1].Number+1
                    }
                }
                this.setState((prevstate) => {
                    return {//перезапись масива
                        Array:arry,
                        SpaseLeft:prevstate.textSize*prevstate.textSize-prevstate.textBomb-1,
                        firstClick:false,
                    };
                  });
                  this.ComandWatch("START")//и запускаем таймер
        }
    }
    render(){
        return (
            <div className="Sapper">
                <div className="Create_Array">
                    <div className="row_Array">
                        ARRAY SIZE <input type='number' value={this.state.textSize} onChange={this.tapS}></input>
                    </div>
                    <div className="row_Array">
                        NUMBER OF BOMBS <input type='number' value={this.state.textBomb} onChange={this.tapB}></input>
                    </div>
                    <div className={this.state.atantion}>
                        SIZE HEVE TO BE BETWEEN 5 AND 15 AND NUMBER OF BOMB CANT BE MORE THEN SIZE
                        <br/>
                        Справа введите размер между 5 и 15, и количество бомб не больше размера деленного на 2 и не 0
                    </div>
                    <button onClick={this.CreateArray}>
                        Create
                    </button>
                </div>
                <div className="Array_Panel">
                    <div className="Timer_Array">
                        {this.state.hour}:{this.state.min}:{this.state.second}
                    </div>
                    <div className="Timer_Array">
                        {!this.state.faile?(!this.state.win?(this.state.SpaseLeft===""?"":"К победе осталось "+this.state.SpaseLeft):"Вы выиграли, начинайте сначала"):"Вы проиграли, начинайте сначала"}
                    </div>

                    
                    <div className="Array">
                        {
                            
                            this.state.Array.map((items)=>(
                                <div className="but_row" key={items[0].y}>
                                    
                                    {
                                        
                                        items.map((item)=>(
                                            <div key={item.y+" "+item.x} className={item.ClassB} onClick={()=>this.ClickOnBut(item.y, item.x)}>
                                                {item.ClassB==="butCliked"?(item.Number===0?"":item.Number):""}
                                            </div>
                                        ))
                                    }
                                </div>
                                
                            ))
                        }
                    </div>
                    <div  className="Timer_Array">
                    {
                        this.state.list.map((key)=>(
                            <div key={key.time}>
                                {key.time}
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            
          );
    }
  
}

export default Sapper;
