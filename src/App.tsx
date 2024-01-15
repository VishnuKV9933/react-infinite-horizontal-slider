
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';

function App() {
const carouselRef = useRef<HTMLUListElement | null>(null);
const elemRef = useRef<HTMLLIElement | null>(null);
 const [isMouseDawn,setMouseDown]=useState(false)
    const [startX,setStartX]=useState(0)
    const [scrollLeft,setScrollLeft]=useState(0)

    const [cardPerView,setCardPerView] = useState(0)

    const [firstCardWidth,setFirstCardWidth] =  useState(0)

    const [carouselChildren, setCarouselChildren] = useState<Element[] | null>(null);
    useLayoutEffect(()=>{
      setCarouselChildren(
          () => {
              const children = carouselRef.current?.children;
              // console.log(carouselRef.current,'children');
              
              return children ? [...children] : [];}
      )
  },[])
  useLayoutEffect(()=>{
    if(elemRef.current){
      console.log(elemRef.current.offsetWidth,"elemRef.current.offsetWidth");
      
        setFirstCardWidth(elemRef.current.offsetWidth)
    }


},[elemRef.current?.offsetWidth])


  useLayoutEffect(()=>{
    if(carouselRef.current){
        let cardView =Math.round(carouselRef?.current?.offsetWidth / firstCardWidth)
        // setCardPerView(cardView)
        setCardPerView(6)
    }
},[])




useEffect(()=>{
  console.log("keri");
  
  let num=0
  function insetCopiesToBegining(){

    // console.log("evidekeri",carouselChildren);
      if(carouselChildren){
        carouselChildren.slice(-cardPerView).reverse().forEach((elem)=>{
            // console.log(elem);
            // console.log(num,'num');
            num++
            
            carouselRef.current?.insertAdjacentHTML('afterbegin',elem.outerHTML)
        })
      }
      
      
  }

  function insetCopiesToEnd(){
      if(carouselChildren){

        carouselChildren.slice(0,cardPerView).forEach((elem)=>{
            
            carouselRef.current?.insertAdjacentHTML('beforeend',elem.outerHTML)

            // console.log(elem);
            // console.log(num,'num');
            num++
        })
      }
  }

  insetCopiesToBegining()
  insetCopiesToEnd()
},[carouselChildren])





if(elemRef.current){
  console.log(elemRef.current.offsetWidth,"elemRef..offsetWidth");
  
}


useEffect(()=>{
  carouselRef.current?.addEventListener('scroll',infinitescroll)
  return ()=>{
      carouselRef.current?.removeEventListener('scroll',infinitescroll)
  }
},[])

function infinitescroll(){

  if(carouselRef.current){
console.log(carouselRef.current.scrollLeft,"scrollleft");
console.log(carouselRef?.current?.offsetWidth,"offsetwidth");


  }

  
 if(carouselRef.current&&elemRef?.current?.offsetWidth){
        console.log(firstCardWidth,"firstCardWidth");
        
      if(carouselRef.current?.scrollLeft===0){
          carouselRef.current.classList.add('no-transition')
          carouselRef.current.scrollLeft=(2*(carouselRef?.current?.offsetWidth))
          // carouselRef.current.scrollLeft=1853
          carouselRef.current.classList.remove('no-transition')
      }else if(carouselRef.current?.scrollLeft=== carouselRef?.current?.scrollWidth-(carouselRef?.current?.offsetWidth)){
          carouselRef.current.classList.add('no-transition')
          carouselRef.current.scrollLeft=2*(carouselRef?.current?.offsetWidth)+(elemRef.current.offsetWidth*2)
          carouselRef.current.classList.remove('no-transition')
      }
  }


}

  // mouse controll

    function handleMouseDawn(e: React.MouseEvent<HTMLUListElement>){
        setMouseDown(true)
        if (carouselRef.current) {
          carouselRef.current.classList.add("dragging")
            setStartX(e.pageX - carouselRef.current.offsetLeft as number);
            setScrollLeft(carouselRef.current?.scrollLeft)
          }
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLUListElement>|React.TouchEvent<HTMLUListElement>){
        setMouseDown(false)

    }

    function handleMouseUp(){
        setMouseDown(false)
        if(carouselRef.current){
          carouselRef.current.classList.remove('dragging')
        }
    }

    function handleMouseMove(e: React.MouseEvent<HTMLUListElement>){
        if(!isMouseDawn) return
        e.preventDefault()
        if (carouselRef.current) {

            const x =e.pageX-carouselRef.current?.offsetLeft;
            const walk = (x-startX)
            // setWalk(x-startX)
            carouselRef.current.scrollLeft=scrollLeft-walk
        }

    }
    



  return (
    <div className="app">
        <div className="wrapper">
          <ul
          ref={carouselRef}
 onMouseDown={handleMouseDawn}
 onMouseLeave={handleMouseLeave}
 onMouseUp={handleMouseUp}
 onMouseMove={handleMouseMove}
           className="carousel">
            <li
             ref={elemRef}
             className="card bg-black border">
                  
            </li>
            <li className="card bg-blue-200 border">
                  
            </li>
            <li className="card bg-green-300 border">
                  
            </li>
            <li className="card bg-yellow-400 border">
            </li>
            <li className="card bg-red-500 border">
                  
            </li>
            <li className="card bg-indigo-600 border">
                  
            </li>
         

          </ul>
        </div>
    </div>
  );
}

export default App;
