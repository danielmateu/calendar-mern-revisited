import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../__fixtures/authStates";
import { testUserCredentials } from "../__fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

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

    beforeEach(() => {
        localStorage.clear();
    })

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

        waitFor(() => {
            expect(result.current.errorMessage).toBe(null);
        })
    })

    test('startRegister debe realizar el registro correctamente', async () => {

        const newUser = { email: 'meh@gmail.com', password: '123456', name: 'Meh' }

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '123456789',
                name: 'Test User',
                token: '12345678900987654321'
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser)
        })

        const { status, user, errorMessage, token } = result.current;

        // console.log({ status, user, errorMessage, token });

        expect({ status, user, errorMessage, token }).toEqual({
            status: 'authenticated',
            user: { name: 'Test User', uid: '123456789' },
            errorMessage: undefined,

        })

        spy.mockRestore()
    });

    test('startRegister debe de fallar en la creación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        await act(async () => {
            await result.current.startRegister(testUserCredentials)
        })

        const { status, user, errorMessage, token } = result.current;

        expect({ status, user, errorMessage, token }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: "El usuario ya existe con ese email",
        })
    })

    test('checkAuthToken debe fallar si no hay token', async () => {

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        await act(async () => {
            await result.current.checkAuthToken()
        })

        console.log('token', localStorage.getItem('token'));

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'not-authenticated',
            errorMessage: undefined,
            user: {}
        })
    });

    test('checkAuthToken debe autenticar al usuario si hay un token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);

        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })

        await act(async () => {
            await result.current.checkAuthToken()
        })


        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
            user: {
                name: 'testuser',
                uid: '642be70ed14609ad120e1204'
            }
        })

    });
})

