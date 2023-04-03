import { useAuthStore } from "../../hooks/useAuthStore"


export const Navbar = () => {

    const {startLogout, user} = useAuthStore()

    return (
        <nav className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="far fa-calendar-check"></i>
                <span> {user.name}</span>
            </span>
            <button className="btn btn-outline-danger"
                onClick={startLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </nav>
    )
}
