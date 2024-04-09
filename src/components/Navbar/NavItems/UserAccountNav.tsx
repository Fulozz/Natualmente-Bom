/**
 * file: "components/Navbar/NavItems/UserAccountNav.tsx"
 * description: arquivo responsavel pelos itens que irão na Navbar após a autenticação do usuario
 * data: 03/03/2024
 * author: Thiago Silva Andrade
 */
'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hook/useAuth"
import { User } from "@/payload-types"
import Link from "next/link"

const UserAccountNav = ({user}: {user: User}) => {
    const {signOut} = useAuth();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button variant='ghost' size='sm' className="relative">Minha Conta</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium text-sm text-black">{user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/sell">Dashboard de Vendas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem  className="cursor-pointer" onClick={signOut}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserAccountNav