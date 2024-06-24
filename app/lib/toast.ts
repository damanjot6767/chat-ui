import { toast } from "sonner";


type ToasterStatus = 'success' | 'error';


const Toaster = (status: ToasterStatus, message: any) => {

    if(status==='success'){
        toast.success(status, {
            position: 'top-right',
            description: message,
            duration: 5000,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    }

    else{
        toast.error(status, {
            style:{
              border:"1px solid #F88379"
            },
            position: 'top-right',
            description: message,
            duration: 5000,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    }

}

export { Toaster }