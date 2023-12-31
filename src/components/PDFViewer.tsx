import { Viewer, Worker } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { useEffect, useState } from "react"

interface Props {
    file: File
}

export default function PDFViewer(props: Props) {
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        const reader = new FileReader()

        reader.onloadend = () => {
            const result = reader.result
            setFileUrl(typeof result === "string" ? result : undefined)
        }

        reader.readAsDataURL(props.file)
    }, [props.file])

    return <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {fileUrl ? <Viewer fileUrl={fileUrl} /> : <></>}
    </Worker>
}