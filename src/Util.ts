import Swal from "sweetalert2"

interface setNotificationProps {
    icon: "success" | "error" | "warning" | "info" | "question"
    message: string
}

export function setNotification(props: setNotificationProps) {
    const { icon, message } = props
    Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: false,
        timer: 5000
    })
}

export function removeEmptyParams(existingObject: any): any {
    return Object.fromEntries(
        Object.entries(existingObject).filter(([_, value]) => value !== "")
    )
}