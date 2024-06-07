const Logout = () => {
    const onLogout = () => {
        document.cookie = "auth=; path=/;"
        window.location.href="/login"
        return(
            <a onClick={onLogout}>Logout</a>
        )
    }
}

export default Logout