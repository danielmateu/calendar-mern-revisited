import { parseISO } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {
    return events.map(
        (event) => {
            // ...e,
            // start: new Date(e.start),
            // end: new Date(e.end)
            event.start = parseISO(event.start)
            event.end = parseISO(event.end)

            return event
        }
    )
}