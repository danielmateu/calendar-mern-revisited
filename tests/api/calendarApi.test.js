import calendarApi from "../../src/api/calendarApi"

describe('Pruebas sobre calendarApi', () => {
    test('Debe tener la configuación por defecto', () => {
        // console.log(process.env.VITE_API_URL);
        const { VITE_API_URL } = process.env;
        expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL)
    })

    test('Debe tener el header x-token en todas las peticiones', async() => {
        localStorage.setItem('token', '123456789');
        const resp = await calendarApi.get('/events');
        expect(resp.config.headers['x-token']).toBe('123456789');
    })

    
})

