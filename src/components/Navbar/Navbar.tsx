/**
 * file: "components/Navbar/Navbar.tsx"
 * description: arquivo responsavel pela renderização da Navbar
 * data: 21/01/2024
 * author: Thiago Silva Andrade
 */

//NEXT imports
import Link from "next/link"
// UI imports
import { Icons } from "./Icons"
import { buttonVariants } from "../ui/button"
// VIEWS
import Cart from "./NavItems/Cart"
import NavItems from "./NavItems/NavItems"
import MaxWidthWrapper from "../MaxWidthComponent"
import UserAccountNav from "./NavItems/UserAccountNav"

// USER DATA
import { getServerSideUser } from "@/lib/payloadUtils"
import { cookies } from "next/headers"

const Navbar = async () => {
    //Realiza a requisição do usuario para o backend utilizando o token que está salvo nos cookies
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)
    
    return(
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/* TODO: Mobile Navbar*/}

                            <div className="ml-4 flex lg:ml-0">
                                <Link href='/'>
                                    <Icons.logo  className="h-10 w-10"/>
                                </Link>
                            </div>
                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (<Link  href='/sign-in' className={buttonVariants({variant: "ghost"})}>Login</Link>)}
                                    {user ? null : (<span className="h-6  w-px bg-gray-200" aria-hidden="true" />)}
                                    {user ? (<UserAccountNav />) : (<Link href="/sign-up" className={buttonVariants({variant: "ghost"})}>Registre</Link>)}

                                    {user ? <span className="h-6  w-px bg-gray-200" aria-hidden="true" /> : null}
                                    {user ? null : (<div className="flex lg:ml-6" > <span className="h-6  w-px bg-gray-200" aria-hidden="true" /> </div>)}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}

export default Navbar