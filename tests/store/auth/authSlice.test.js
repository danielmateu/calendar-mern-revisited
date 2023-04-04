import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../__fixtures/authStates";

describe('Tests sobre authSlice', () => {

    test('Debe de regresar el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    
})