import { authSlice, clearErrorMessage, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../__fixtures/authStates";
import { testUserCredentials } from "../../__fixtures/testUser";

describe('Tests sobre authSlice', () => {

    test('Debe de regresar el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('Debe de realizar un login', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        })
    })

    test('Debe de realizar un logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        })
    });

    test('Debe de realizar un logout', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage,
        })
    });

    test('Debe de limpiar el mensaje de error', () => {

        const state = authSlice.reducer(authenticatedState, authSlice.actions.clearErrorMessage());

        const newState = authSlice.reducer(state, clearErrorMessage());
        
        expect(state).toEqual({
            status: 'authenticated',
            user: {
                uid: '123',
                name: 'Dani',
            },
            errorMessage: undefined,
        })

        expect(newState.errorMessage).toBe(undefined)
    })
})