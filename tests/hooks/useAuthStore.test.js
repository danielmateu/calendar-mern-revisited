import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import { Provider } from "react-redux";
import { notAuthenticatedState } from "../__fixtures/authStates";
import { testUserCredentials } from "../__fixtures/testUser";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        },
    })
}

describe('Pruebas sobre useAuthStore', () => {

    test('Debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({
            status: 'checking', user: null, errorMessage: null
        });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })
        const { status, user, errorMessage } = result.current;

        // console.log(result);

        expect(status).toBe('checking');
        expect(user).toBe(null);
        expect(errorMessage).toBe(null);

        expect(result.current).toEqual(
            {
                status: 'checking',
                user: null,
                errorMessage: null,
                startLogin: expect.any(Function),
                startRegister: expect.any(Function),
                checkAuthToken: expect.any(Function),
                startLogout: expect.any(Function)
            }
        )
    })

    test('startLogin debe realizar el login correctamente', async () => {
        localStorage.clear()

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        })

        // console.log(result.current);

        const { status, user, errorMessage } = result.current;

        // expect(status).toBe('authenticated');
        // expect(user).toEqual({ name: 'Test User', uid: '123456789' });
        // expect(errorMessage).toBe(null);

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: { name: 'testuser', uid: '642be70ed14609ad120e1204' },
            errorMessage: undefined
        })

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    })

    test('startLogin debe fallar en la autenticación', async () => {

        localStorage.clear()

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        await act(async () => {
            await result.current.startLogin({ email: 'meh@gmail.com', password: '123456' })
        })

        const { status, user, errorMessage } = result.current;
        // console.log({status, user, errorMessage});
        // console.log(localStorage.getItem('token'));
        expect(localStorage.getItem('token')).toBe(null);
        expect({ status, user, errorMessage }).toEqual(
            {
                status: 'not-authenticated',
                user: {},
                errorMessage: 'Error en el login'
            }
        )
    })
})

