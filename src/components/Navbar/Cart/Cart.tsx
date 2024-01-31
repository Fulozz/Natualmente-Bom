"use client"

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger,  SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatPrice } from "@/lib/utils";

import { ShoppingCart } from "lucide-react"


const Cart = () =>{
    const itemCount = 1; 
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
                </SheetHeader>
                { itemCount > 0 ? (
                    <>
                    {/* TODO: Cart logic */}
                    <div className="flex w-full flex-col pr-6">Itens no carrinho</div>
                    <div className="space-y-4 pr-6"> 
                        <Separator />
                        <div className="space-y-1.5 text-sm">
                            <div className="flex">
                                <span className="flex-1"> Taxa de entrega</span>
                                {/* TODO: Taxa diminuir de acordo com a quantidade de encomenda até 100 reais, 10 reais de taxa, até 150 7 reais, acima de 200 gratuita */}
                                <span>{formatPrice(10)}</span>
                            </div>
                        </div>
                        <div className="space-y-1.5 text-sm">
                            <div className="flex">
                                <span className="flex-1"> Sem taxas adicionais</span>
                                <span>{formatPrice(1)}</span>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                <div>

                </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Cart