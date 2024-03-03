"use client"
// NEXT imports
import Image from "next/image";
import Link from "next/link";

// UI imports
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger,  SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react"

// LIB imports
import { formatPrice } from "@/lib/utils";





const Cart = () =>{
    const itemCount = 0; 
    return(
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <ShoppingCart aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-emerald-400 ease-out group-hover:text-emerald-500 duration-1.5 group-hover:ease-in" />
                <span className="ml-2 text-sm font-medium text-emerald-700 group-hover:text-emerald-80 duration-1.5">
                    {itemCount}
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Carrinho</SheetTitle>
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
                                
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetTrigger>
                                <Link href='/cart' className={buttonVariants({
                                    className: 'w-full',
                                })}>Finalizar a compra</Link>
                            </SheetTrigger>
                        </SheetFooter>
                    </div>
                    </>
                ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                    <div arial-hidden='true' className="relative mb-4 h-60 w-60 text-muted-foreground">
                        <Image src='/hippo-empty-cart.png' fill alt='carrinho vazio'/>
                    </div>
                    <div className="text-xl font-semibold">Seu carrinho está vazio</div>
                    <SheetTrigger asChild>
                        <Link href='/products' className={buttonVariants({
                            variant: "link",
                            size: 'sm',
                            className: 'text-sm text--muted-foreground'
                        })}>Adicione items no seu carrinho</Link>
                    </SheetTrigger>
                </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Cart