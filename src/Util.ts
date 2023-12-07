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