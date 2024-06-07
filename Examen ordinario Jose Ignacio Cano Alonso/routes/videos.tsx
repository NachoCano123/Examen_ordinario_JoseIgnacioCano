import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {Video} from "../types.ts"
import VideoList from "../components/ListaVideos.tsx"

type State = {
    id: string,
    name: string,
    email: string,
}
type Data = {
    videos: Video[],
    userid: string
}

export const handler: Handlers<Data, State> = {
    GET: async(req:Request, ctx: FreshContext<State, Data>) => {
        const userid = ctx.state.id
        const API = Deno.env.get("API")

        if(!API)
            {
                throw new Error("API no encontrada");
            }

        const resp = await fetch(`${!API}/videos/${userid}`)
        if(resp.status !== 200) {
            return ctx.render({videos:[], userid:""})
        }
        const videos: Video[] = await resp.json()

        return ctx.render({videos, userid})
    }
}

const Page = (props: PageProps<Data>) => (
    <div>
        <h1>
            Curso Deno
        </h1>
        <VideoList videos={props.data.videos} userid={props.data.userid}></VideoList>
    </div>
)

export default Page