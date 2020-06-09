import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Moment } from 'moment';
import 'moment/locale/pl';
import moment from 'moment';

interface DatePickerProps {
  id: string;
  onChange: (date: Moment) => void;
  value: Moment;
  min?: Moment;
  max?: Moment;
  disable?: boolean;
}

const DatePicker = (props: DatePickerProps) => {
  moment.locale('pl');
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        margin='normal'
        disableToolbar
        id={props.id}
        onChange={() => {}}
        onAccept={props.onChange}
        value={props.value}
        format='DD-MM-YYYY'
        cancelLabel='Anuluj'
        minDate={props.min}
        maxDate={props.max}
        disabled={props.disable}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
