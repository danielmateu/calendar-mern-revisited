import { useDispatch, useSelector } from "react-redux"
// import { onLogin } from "../store/auth/authSlice"
import calendarApi from "../api/calendarApi"

export const useAuthStore = () => {

    const {
        status,
        user,
        errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        // console.log({ email, password });
        // dispatch(onChecking())

        try {
            // const resp = await calendarApi.post('/auth/', { email, password });
            const resp = await calendarApi.post('/auth', { email, password });
            console.log(resp);
            // dispatch(onLogin(data));
        } catch (error) {
            console.log(error);
        }
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Métodos
        startLogin,
    }
}