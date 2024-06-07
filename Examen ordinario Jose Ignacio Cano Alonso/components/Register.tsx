import { FunctionComponent } from "preact";

type Props = {
  mensajeError?: string
}

const Register: FunctionComponent<Props> = ({mensajeError}) => 
(
    <div>
        <h1> Register </h1>
        <form method="POST" action="/register">
            <label for="name"> Full Name </label>
            <input type="text" id="name" name="name"/>

            <label for="email"> Email </label>
            <input type="text" id="email" name="email"/>

            <label for="password"> Password </label>
            <input type="password" id="password" name="password"/>

            <button type="submit"> Register </button>
            <p> Already have an account? </p>
            <a href="/Login"> Login </a>
        </form>
    </div>
)

export default Register