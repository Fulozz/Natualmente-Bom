"use client"

import { Sheet, SheetTrigger,  SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"


const Cart = () =>{
    const itemCount = 0; 
    return(
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <ShoppingCart aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-emerald-400 ease-out group-hover:text-emerald-500 duration-1.5 group-hover:ease-in" />
                <span className="ml-2 text-sm font-medium text-emerald-700 group-hover:text-emerald-80 duration-1.5">
                    0
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Cart (0)</SheetTitle>
                    Sheet
                </SheetHeader>
                { itemCount > 0 ? (
                    <>
                    <div className="flex w-full flex-col pr-6">Card Items</div>
                    </>
                ) : (<></>) }
            </SheetContent>
        </Sheet>
    )
}

export default Cart