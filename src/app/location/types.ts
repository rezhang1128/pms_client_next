
export type clinicProp = {
    // key:React.Key;
    name: string,
    street: string,
    phone: string,
    email: string
}

export type EditClinicModalProps = {
    clinic:  clinicProp | null;
    visible: boolean;
    onEditSubmit: (values:  clinicProp) => void;
    onCancel: () => void;
  };