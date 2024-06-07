export type Usuario = 
{
    email: string,
    name: string,
    id: string,
    password: string,
    favs: string[]
}

export type Video = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    fav: boolean,
    youtubeid: string,
    date: string
}