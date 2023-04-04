import { renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import { Provider } from "react-redux";

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
        const mockStore = getMockStore({status: 'checking',user: null,errorMessage: null
        });
        const { result } = renderHook(() => useAuthStore(), { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> })
        const { status, user, errorMessage } = result.current;
        expect(status).toBe('checking');
        expect(user).toBe(null);
        expect(errorMessage).toBe(null);

    })
})