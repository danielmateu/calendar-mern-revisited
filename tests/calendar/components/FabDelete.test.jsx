import { render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { Provider } from "react-redux"
import { store } from "../../../src/store/store"

describe('PRuebas sobre FabDelete', () => {

    test('debe de mostrarse correctamente', () => {

        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        )
        // screen.debug()
        // expect(screen.getByTestId('fab-delete')).toBeInTheDocument()

    })
})