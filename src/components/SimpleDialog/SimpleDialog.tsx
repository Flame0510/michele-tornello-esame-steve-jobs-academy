import { Dialog, DialogTitle } from "@mui/material";

interface SimpleDialogProps {
  title: string;
  DialogContent: any;
  open: boolean;
  onClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { title, DialogContent, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent />
    </Dialog>
  );
};

export default SimpleDialog;
