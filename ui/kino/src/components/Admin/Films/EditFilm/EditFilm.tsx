import React, { useState, useEffect } from 'react';
import CustomModal from '../../../CustomModal';
import FilmForm from '../FilmForm';
import { Film } from '../../../../models/Film';
import { getFilm, editFilm } from '../../../../services/FilmService';
import { Moment } from 'moment';

interface EditFilmProps {
  handleEdited: () => void;
  handleClose: () => void;
  movieId: string;
}

const EditFilm = (props: EditFilmProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [film, setFilm] = useState<Film | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFilm(props.movieId);
      setFilm(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    props.handleClose();
  };

  const handleEdit = async (
    title: string,
    director: string,
    ageCategory: string,
    movieCategory: string,
    duration: number,
    dateStart: Moment,
    dateEnd: Moment
  ) => {
    setOpen(false);
    await editFilm(
      props.movieId,
      title,
      director,
      ageCategory,
      movieCategory,
      duration,
      dateStart,
      dateEnd
    );
    props.handleEdited();
  };
  return (
    <>
      {film && (
        <CustomModal
          open={open}
          handleClose={handleClose}
          body={
            <FilmForm
              handleClose={handleClose}
              handleAction={handleEdit}
              editModel={film}
              buttonText='Edytuj'
              formTitle='Edytuj film'
            />
          }
        />
      )}
    </>
  );
};

export default EditFilm;
