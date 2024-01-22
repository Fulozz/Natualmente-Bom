/**
 * file: "components/Navbar/NavItems.tsx"
 * description: arquivo responsavel pelos itens que irão na Navbar (home, sign-in, sign-out)
 * data: 21/01/2024
 * author: Thiago Silva Andrade
 */


// Use client é necessario para poder utilizar o useState pois sem ele o Typescript/React trata a pagina como Server side
"use client"

import { useEffect, useRef, useState } from "react"
import { PRODUCT_CATEGORIES } from "../../config"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hook/useOnClickOutside"

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    // Validador do teclado para fechar o Active index caso o usuario aperte ESC
    useEffect(()=> {
        const handler = (e: KeyboardEvent) =>{
            if(e.key === "Escape"){
                setActiveIndex(null)
            }
        }
        document.addEventListener("keydown", handler)
        return ()=> {
            document.removeEventListener("keydown", handler)
        }
    }, [])
    
    // Validador do scroll para fechar o Active index caso o usuario scrolle para baixo
    useEffect(() => {
        const onScroll: EventListener = (event: Event) => { // <-- DOM-EventListener
            setActiveIndex(null)
        };
        const win: Window = window;   // <-- DOM-Window, extends DOM-EventTarget
        win.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Identificador se está ativo com base no index Ativo
    const isAnyOpen = activeIndex !== null;

    const navRef = useRef<HTMLDivElement | null>(null);
    
    useOnClickOutside(navRef, ()=> setActiveIndex(null))
    return(
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES && PRODUCT_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if(activeIndex === i){
                        setActiveIndex(null)
                    }  else {
                        setActiveIndex(i)
                    }
                }
                const isOpen = i === activeIndex
                return <NavItem category={category}  handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen}/>;
            })}
        </div>
    )
}
export default NavItems