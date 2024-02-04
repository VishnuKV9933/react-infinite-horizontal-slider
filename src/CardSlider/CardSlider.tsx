import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./cardslider.css";

function CardSlider(): React.ReactElement {
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const elemRef = useRef<HTMLLIElement | null>(null);
  const [isMouseDawn, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [cardPerView, setCardPerView] = useState(0);

  const [firstCardWidth, setFirstCardWidth] = useState(0);

  const [carouselChildren, setCarouselChildren] = useState<Element[] | null>(
    null
  );
  let addextreItemRef = useRef(true);

  let initialScrollWidth: number | undefined;

  useEffect(() => {
    initialScrollWidth = carouselRef.current?.scrollWidth;

    setCarouselChildren(() => {
      const children = carouselRef.current?.children;

      return children ? [...children] : [];
    });
  }, []);
  useEffect(() => {
    if (elemRef.current) {
      setFirstCardWidth(elemRef.current.offsetWidth);
    }
  }, [elemRef.current?.offsetWidth]);

  useLayoutEffect(() => {
    if (carouselRef.current) {
      let cardView = Math.round(
        carouselRef?.current?.offsetWidth / firstCardWidth
      );
      // setCardPerView(cardView)
      setCardPerView(carouselRef.current?.children.length);
    }
  }, []);

  useEffect(() => {
    function insetCopiesToBegining() {
      if (carouselChildren) {
        carouselChildren
          .slice(-cardPerView)
          .reverse()
          .forEach((elem) => {
            carouselRef.current?.insertAdjacentHTML(
              "afterbegin",
              elem.outerHTML
            );
          });
      }
    }

    function insetCopiesToEnd() {
      if (carouselChildren) {
        carouselChildren.slice(0, cardPerView).forEach((elem) => {
          carouselRef.current?.insertAdjacentHTML("beforeend", elem.outerHTML);
        });
      }
    }

    if (addextreItemRef.current && carouselChildren) {
      insetCopiesToBegining();
      insetCopiesToEnd();
      addextreItemRef.current = false;
    }
  }, [carouselChildren]);

  useEffect(() => {
    carouselRef.current?.addEventListener("scroll", infinitescroll);
    return () => {
      carouselRef.current?.removeEventListener("scroll", infinitescroll);
    };
  }, []);

  function infinitescroll() {
    if (carouselRef.current) {
    }

    if (carouselRef.current && elemRef?.current?.offsetWidth) {
      if (carouselRef.current?.scrollLeft === 0) {
        carouselRef.current.classList.add("no-transition");

        // carouselRef.current.scrollLeft=(carouselRef.current.scrollWidth - (2*carouselRef.current.offsetWidth))

        carouselRef.current &&
          (carouselRef.current.scrollLeft = initialScrollWidth as number);
        carouselRef.current.classList.remove("no-transition");
      } else if (
        carouselRef.current?.scrollLeft ===
        carouselRef?.current?.scrollWidth - carouselRef?.current?.offsetWidth
      ) {
        let initialCarouselwidth=initialScrollWidth as number
        let distanceToReduce = initialCarouselwidth - carouselRef.current.offsetWidth
        carouselRef.current.classList.add("no-transition");
        // carouselRef.current.scrollLeft=2*(carouselRef?.current?.offsetWidth)+(elemRef.current.offsetWidth*2)
        carouselRef.current &&
          (carouselRef.current.scrollLeft =
            (initialCarouselwidth) + (distanceToReduce));
        carouselRef.current.classList.remove("no-transition");
      }
    }
  }

  // mouse controll

  function handleMouseDawn(e: React.MouseEvent<HTMLUListElement>) {
    setMouseDown(true);
    if (carouselRef.current) {
      carouselRef.current.classList.add("dragging");
      setStartX((e.pageX - carouselRef.current.offsetLeft) as number);
      setScrollLeft(carouselRef.current?.scrollLeft);
    }
  }

  function handleMouseLeave(
    e: React.MouseEvent<HTMLUListElement> | React.TouchEvent<HTMLUListElement>
  ) {
    setMouseDown(false);
  }

  function handleMouseUp() {
    setMouseDown(false);
    if (carouselRef.current) {
      carouselRef.current.classList.remove("dragging");
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
    if (!isMouseDawn) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current?.offsetLeft;
      const walk = x - startX;
      // setWalk(x-startX)
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  }

  // useEffect(()=>{
    
  //  let automoveIntervel= setInterval(()=>{
  //     autoScroll()
  //   },5000)

  //   return ()=>{
  //     clearInterval(automoveIntervel)
  //   }
  // },[])

  function autoScroll(){
    if(carouselRef.current&&elemRef.current){
      const nextScrollLeft = carouselRef.current.scrollLeft + elemRef.current.offsetWidth;
    carouselRef.current.scrollLeft = nextScrollLeft;
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
          className="carousel"
        >
          <li ref={elemRef} className="card bg-black border"></li>
          <li className="card bg-blue-200 border"></li>
          <li className="card bg-green-300 border"></li>
          <li className="card bg-yellow-400 border"></li>
          <li className="card bg-red-500 border"></li>
          <li className="card bg-green-500 border"></li>
          <li className="card bg-orange-500 border"></li>
          <li className="card bg-blue-700 border"></li>
        </ul>
      </div>
    </div>
  );
}

export default CardSlider;
