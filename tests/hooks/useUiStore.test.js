import { renderHook } from "@testing-library/react"
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";
import { store } from "../../src/store/store";
import { authSlice } from "../../src/store/auth/authSlice";
import { calendarSlice } from "../../src/store/calendar/calendarSlice";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            // Add your reducers here
            // auth: authSlice.reducer,
            ui: uiSlice.reducer,
            // calendar: calendarSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        },
    })
}

describe('PRuebas sobre hook useUuiStre', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    test('Debe regresar los valores por defecto', () => {
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        console.log(result);

        expect(result.current.isDateModalOpen).toBe(false);
        
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })

    })
})