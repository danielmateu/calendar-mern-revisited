import { useDispatch, useSelector } from "react-redux"
// import { onLogin } from "../store/auth/authSlice"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

export const useAuthStore = () => {

    const {
        status,
        user,
        errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        // console.log({ email, password });
        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            // console.log(error);
            dispatch(onLogout('Error en el login'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 300);
        }
    }

    const startRegister = async ({ email, password, name }) => {

        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            // console.log(error);
            dispatch(onLogout(error.response.data?.message || ''));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 300);
        }
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Métodos
        startLogin,
        startRegister
    }
}