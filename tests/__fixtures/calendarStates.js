export const events = [
    {
        id: '1',
        title: 'Event 1',
        start: new Date(2019, 0, 1, 10, 0),
        end: new Date(2019, 0, 1, 11, 0),
        title: 'Cumple Dani',
        notes: 'Alguna nota'
    },
    {
        id: '2',
        title: 'Event 2',
        start: new Date(2019, 0, 1, 10, 0),
        end: new Date(2019, 0, 1, 11, 0),
        title: 'Cumple Silvia',
        notes: 'Alguna nota de Silvia'
    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] },
}