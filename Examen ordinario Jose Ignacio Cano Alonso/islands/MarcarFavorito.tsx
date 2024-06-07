import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type Props = {
    id:string,
    fav:boolean,
    userid:string
}

const Fav: FunctionComponent<Props>=({userid, id, fav}) => {
    const [favourite, setfavourite] = useState<boolean>(fav)
    const tooglefav = async(userid:string, id: string,) => {
        const response = await fetch(
            `https://videoapp-api.deno.dev/${userid}/${id}`, 
            {method: "POST", headers: {"Content-type":"application/json"}}
        )
        if(response.status === 200) {
            setfavourite(!favourite)
        }
        else
        {
            console.log("Error invirtiendo el favorito")
        }
    }
    return(<button onClick={() =>tooglefav(userid,id)}> { favourite?"Remove from favorites" : "Add to favorites"}</button>)
}

export default Fav