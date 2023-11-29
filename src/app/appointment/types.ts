
export type appiontmentProp = {
    date: string,
    time: string,
    doctor:string,
    treatment:string,
    location: string,
    patient: string,
    email: string,
    clinic:string
}

export type filterProp = {
    patient: string,
    doctor: string,
    clinic: string,
    treatment: string
}

export type EditAppiontModalProps = {
    appiont:  appiontmentProp | null;
    visible: boolean;
    onEditSubmit: (values:  appiontmentProp) => void;
    onCancel: () => void;
  };