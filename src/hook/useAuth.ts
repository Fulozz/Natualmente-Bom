import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuth = () => {
    const router = useRouter()
    const signOut = async() => { 
        // sign out logic
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!res.ok){
                throw new Error()
            };
            toast.success("Você saiu da sua conta com sucesso.");
            router.push('/sign-in');
            router.refresh();
        }
        catch (err){
            toast.error("Não foi possível sair da sua conta. Por favor, tente novamente.")
        };
    }
    return {signOut};
}