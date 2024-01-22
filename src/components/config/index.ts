/**
 * file: "components/config/index.ts"
 * description: arquivo responsavel pela configuração de categorias e ordenação
 * data: 21/01/2024
 * author: Thiago Silva Andrade
 */
// Nome em caps porque são coisas inauteraveis 
export const PRODUCT_CATEGORIES = [
    {
        label: "Hortaliças",
        value: "hortalicas" as const,
        featured:[
            {
                name: "Principal escolha",
                href: "#",
                imageSrc: '/nav/verduras/hortalicas.jpeg'
            },
            {
                name: "Novidades",
                href: "#",
                imageSrc: '/nav/verduras/tuberculos.jpeg'
            },
            {
                name: "Mais vendidos",
                href: "#",
                imageSrc: '/nav/verduras/frutas.jpg'
            },
        ]
    },
    {
        label: "Legumes",
        value: "legumes" as const,
        featured:[
            {
                name: "Principal escolha",
                href: "#",
                imageSrc: '/nav/legumes/legumes.jpg'
            },
            {
                name: "Novidades",
                href: "#",
                imageSrc: '/nav/legumes/beterraba.webp'
            },
            {
                name: "Mais vendidos",
                href: "#",
                imageSrc: '/nav/legumes/milho.jpeg'
            },
        ]
    },
]

{/* TODO: trocar as imagens por imagens de verduras para serem utilizadas no futuro */}