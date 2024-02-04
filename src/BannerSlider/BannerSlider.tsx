import { useCallback, useEffect, useRef, useState } from 'react'
import './bannerslider.css'

export default function BannerSlider() {
    const containerRef = useRef<HTMLUListElement | null>(null)
    const elemRef = useRef<HTMLLIElement | null>(null)

    const [current,setCurrent] = useState(1)
    const [translateX,setTranslateX] = useState(0)
    const [children, setCarouselChildren] = useState<Element[] | null>(
        null
      );
    
useEffect(()=>{
    setCarouselChildren(()=>{
        const children = containerRef.current?.children;

      return children ? [...children] : [];
    })
})

const actionHandler = useCallback((mode:string)=>{

    if(mode==='prev'){
        if(current<=1){
            setTranslateX(0)
            
          children && setCurrent(children.length)
        }
    }

},[])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='banner-wrapper w-[500px] h-[300px]  '>
                <ul
                    ref={containerRef}
                    style={{transform:`translate3d(${-translateX}px,0,0)`}}
                    className="banner-carousel w-full h-full flex gap-3" >

                        <li ref={elemRef} className='banner-slide  bg-red-400'></li>
                        <li className='banner-slide  h-full bg-green-400'></li>
                        <li className='banner-slide  h-full bg-blue-400'></li>
                   
                </ul>
            </div>
        </div>
    )
}
