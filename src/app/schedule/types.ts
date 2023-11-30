import { appiontmentProp } from "../appointment/types"
export type CalendarProp = {
    detail: (record: appiontmentProp) => void,
    appointment: appiontmentProp[] | null,
    state: string
}
export type ShowAppointmentProps = {
    currentApp: appiontmentProp | null;
    onSubmit: () => void;
};

export type MakeAppointmentProps = {
// currentApp: appiontmentProp | null;
onSubmit: () => void;
};