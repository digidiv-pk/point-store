import React, { ChangeEvent, useEffect, useState } from 'react';

const isChrome = navigator.userAgent.indexOf('Chrome') > -1;

interface DateTimeEvent {
  target: {
    name: string;
    value: string;
  };
}

interface DateTimeState {
  date: string;
  time: string;
}

interface Props {
  name: string;
  id: string;
  placeholder: string;
  onChange(event: DateTimeEvent): void;
}

function DatetimeLocalInput(props: Props): JSX.Element {
  const [state, setState] = useState<DateTimeState>({
    date: '',
    time: '',
  });

  useEffect(() => {
    const date = !!state.date
      ? new Date(state.date).toLocaleDateString()
      : new Date().toLocaleDateString();
    const time = !!state.time ? state.time : new Date().toLocaleTimeString();
    props.onChange({
      target: {
        name: props.name,
        value: new Date(`${date} ${time}`).toISOString(),
      },
    });
  }, [state]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      target: {
        name: event.target.name,
        value: new Date(event.target.value).toISOString(),
      },
    });
  };

  if (isChrome) {
    return (
      <input
        {...props}
        type="datetime-local"
        name={props.name}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        onChange={handleInputChange}
      />
    );
  } else {
    return (
      <div className="form-inline w-100">
        <div className="form-group w-50 p-1">
          <input
            type="date"
            className="form-control w-100"
            id={props.id}
            name="date"
            value={state.date}
            onChange={(event) => {
              setState({
                ...state,
                [event.target.name]: event.target.value,
              });
            }}
          />
        </div>
        <div className="form-group w-50 p-1">
          <input
            type="time"
            className="form-control w-100"
            name="time"
            value={state.time}
            onChange={(event) => {
              setState({
                ...state,
                [event.target.name]: event.target.value,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default DatetimeLocalInput;
