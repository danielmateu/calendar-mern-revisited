

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="far fa-calendar-check"></i>
                <span> Dani</span>
            </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </nav>
    )
}
