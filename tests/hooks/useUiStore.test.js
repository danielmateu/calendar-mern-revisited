import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
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
        // console.log(result);
        expect(result.current.isDateModalOpen).toBe(false);

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })
    })

    test('openDateModal debe de colcar true en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        const { openDateModal } = result.current;

        act(() => openDateModal())  // openDateModal()

        expect(result.current.isDateModalOpen).toBeTruthy()

    })

    test('closeDateModal debe de colcar false en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        const { closeDateModal } = result.current;

        act(() => closeDateModal())  // closeDateModal()

        expect(result.current.isDateModalOpen).toBeFalsy()
    })

    test('toggleDateModal debe de cambiar el estado respectivamente', () => {
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        const { toggleDateModal } = result.current;

        act(() => toggleDateModal())  // toggleDateModal()
        expect(result.current.isDateModalOpen).toBeFalsy()

        act(() =>  result.current.toggleDateModal()) 
        // console.log(result.current.isDateModalOpen);
        expect(result.current.isDateModalOpen).toBe(true)
    })
})