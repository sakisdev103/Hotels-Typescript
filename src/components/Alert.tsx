import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type state = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
};

const Alert = ({ showModal, setShowModal, url }: state) => {
  return (
    <div className="container">
      <AlertDialog open={showModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You will be redirected on Booking.com
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowModal(!showModal)}>
              Stay
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => window.location.replace(url)}>
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Alert;
