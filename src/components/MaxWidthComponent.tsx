/**
 * file: "components/MaxWidthComponent"
 * description: arquivo responsavel por manter todas as paginas com um padrão parecido, cn é o responsavel por fazer a utilização dinamica dos className
 * data: 20/01/2024
 * author: Thiago Silva Andrade
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react"

const MaxWidthWrapper = ({
    className,
    children
} : {
    //tipagem
    className?: string,
    children: ReactNode
}) => {
    return(
        <div 
        className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", 
        className
        )}>
        {children}
    </div>
    )
}

export default MaxWidthWrapper;