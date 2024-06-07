import { FreshContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "npm:cookies";
import jwt from "jsonwebtoken"

type Estado = {
    name: string
    email: string
    id: string
}

export async function handler(req:Request, ctx: FreshContext) {
    if(ctx.destination !== "route")
    {
        const r = ctx.next()
        return r
    }

    if(ctx.route === "/login" || ctx.route === "/register")
    {
        const r = ctx.next()
        return r
    }

    const {auth} = getCookies(req.headers)
    
    if(!auth)
    {
        return new Response( "",
            {
                status: 500,
                headers:{location: "/login"}
            }
        )
    }

    const tok = jwt.verify(auth, Deno.env.get("JWT_SECRET"))
    if(!tok)
    {
        return new Response( "",
            {
                status: 500,
                headers:{location: "/login"}
            }
        )
    }

    ctx.state.name = tok.name
    ctx.state.email = tok.email
    ctx.state.email = tok.email

    const r = ctx.next()
    return r
}