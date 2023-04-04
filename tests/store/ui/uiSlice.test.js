import { onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Pruebas sobre uiSlice', () => {
    test('Debe de regresar el estado por defecto', () => {
        const state = uiSlice.reducer(undefined, {});
        expect(state).toEqual({
            isDateModalOpen: false,
        })
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()

    })

    test('Debe de abrir el modal', () => {
        const state = uiSlice.reducer(undefined, uiSlice.actions.onOpenDateModal());
        expect(state).toEqual({
            isDateModalOpen: true,
        })
    })

    test('Debe cambiar el isDateModalOpen correctamente', () => {
        let state = uiSlice.getInitialState()

        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy()

        state = uiSlice.reducer(state, uiSlice.actions.onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy()
    })
})