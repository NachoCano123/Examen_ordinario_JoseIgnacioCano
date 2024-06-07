import { FunctionComponent } from "preact";

type Props = {
  mensajeError?: string
}

const Login: FunctionComponent<Props> = ({mensajeError}) => 
(
    <div>
        <h1> Login </h1>
        {mensajeError && <p>{mensajeError}</p>}
        <form method="POST" action="/login"> {/*Para poder postearlos en la ruta login.tsx*/}

            <label for="email"> Email </label>
            <input type="text" id="email" name="email"/>

            <label for="password"> Password </label>
            <input type="password" id="password" name="password"/>

            <button type="submit"> Login </button> {/*submit envia los datos recopilados en el form*/}
            <p> Don't have an account? </p>
            <a href="/Register"> Register </a>
        </form>
    </div>
)

export default Login