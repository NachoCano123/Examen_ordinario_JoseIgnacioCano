import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "npm:cookies";
import Login from "../components/Login.tsx"
import {Usuario} from "../types.ts"
import jwt from "jsonwebtoken"

type Data = {
    message:string
}

export const handler: Handlers = {
    POST: async(req:Request, ctx: FreshContext) => {
        const url = new URL(req.url)
        const miformulario = await req.formData()
        const email = miformulario.get("email")?.toString() || ""
        const password = miformulario.get("password")?.toString() || ""

        const JWT_SECRET = Deno.env.get("JWT_SECRET")
        if(!JWT_SECRET)
            {
                throw new Error("JWT_SECRET no establecido");
            }

        const resp = await fetch(`${Deno.env.get("API")}/checkuser`,{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({ 
                email,
                password,
            })
        }
    )
    if(resp.status === 404)
    {
        return ctx.render("Usuario no encontrado o datos incorrectos")
    }

    if(resp.status === 200)
    {
        const data: Omit<Usuario, "password" | "favs"> = await resp.json()
        const tok = jwt.sign({email, id: data.id, name: data.name}, Deno.env.get("JWT_SECRET"),{expiresIn: "24h"})

        const headers = new Headers()
        setCookie(
        {
            name: "auth",
            value: tok, 
            sameSite: "lax",
            domain: url.hostname,
            path: "/",
            secure: true
        })
        headers.set("location", "/videos")

        return new Response(null,{status: 303, headers})
    }
    else
    {
        return ctx.render()
    }
    }
}

const Page = (props: PageProps<Data>) => (
    <Login mensajeError= {props.data?.message}></Login>
)

export default Page