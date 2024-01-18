import { appiontmentProp } from "../appointment/types"
export type CalendarProp = {
    detail: (record: appiontmentProp) => void,
    appointment: appiontmentProp[] | null,
    state: string
}
export type ShowAppointmentProps = {
    appointment: appiontmentProp[] | null,
    onSubmit: () => void
};

export type AvailiableApp = {
    doctor: string,
    clinic: string,
    address: string,
    startTime: string,
    endTime: string
}

export type MakeAppointmentProps = {
// currentApp: appiontmentProp | null;
visible: boolean,
availiableApp: AvailiableApp[] | [],
getApp: (arg0:AvailiableApp) => void,
onCancel: (cancelFunc: (arg0: AvailiableApp) => void) => void
};
