import React, { useState, useEffect } from 'react';
import { Hall } from '../../../../models/Hall';
import CustomModal from '../../../CustomModal';
import HallForm from '../HallForm';
import { getHall, editHall } from '../../../../services/HallService';

interface EditHallProps {
  handleEdited: () => void;
  handleClose: () => void;
  hallId: string;
}

const EditHall = (props: EditHallProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [hall, setHall] = useState<Hall | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHall(props.hallId);
      setHall(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    props.handleClose();
  };

  const handleEdit = async (
    name: string,
    rowsCount: number,
    seatsPerRow: number,
    availability: string
  ) => {
    setOpen(false);
    await editHall(props.hallId, name, rowsCount, seatsPerRow, availability);
    props.handleEdited();
  };

  return (
    <>
      {hall && (
        <CustomModal
          open={open}
          handleClose={handleClose}
          body={
            <HallForm
              handleClose={handleClose}
              handleAction={handleEdit}
              editModel={hall}
              buttonText='Edytuj'
            />
          }
        />
      )}
    </>
  );
};

export default EditHall;
