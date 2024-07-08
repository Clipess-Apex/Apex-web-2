import styled from 'styled-components';


export const TimeEntryCalendar  = styled.div`
.react-calendar {
    width: 400px;
    height: fit-content;
    max-width: 100%;
    background: white;
    border-radius: 5%;
    font-family: "Inter", sans-serif;
    line-height: 1.125em;
    font-weight: 450;
    padding: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.55);
  }
  
  .react-calendar--doubleView {
    width: 700px;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer>* {
    width: 50%;
    margin: 0.5em;
  }
  
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }
  
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }
  
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }
  
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__tile--now {
    background: #ffff76;
  }
  
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffff76;
  }
  
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  
  .react-calendar__tile--active {
    color: inherit;
  }
  
  
  .react-calendar__tile--active:enabled:focus {
    background: rgba(0, 167, 167, 0.25);
  }
  
  .react-calendar__month-view__days__day--weekend.react-calendar__tile--active {
    color: #d10000;
  }
  
  
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

/* DashBoard Calendar */

export const TimeEntryDashboardCalendar  = styled.div`
.react-calendar {
    width: 400px;
    height: fit-content;
    max-width: 100%;
    background: white;
    border:none;
    border-radius: 5%;
    font-family: "Inter", sans-serif;
    line-height: 1.125em;
    font-weight: 450;
    padding: 10px;
  }
  
  .react-calendar--doubleView {
    width: 700px;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer>* {
    width: 50%;
    margin: 0.5em;
  }
  
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }
  
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }
  
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }
  
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__tile--now {
    background: #ffff76;
  }
  
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffff76;
  }
  
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  
  .react-calendar__tile--active {
    color: inherit;
  }
  
  
  .react-calendar__tile--active:enabled:focus {
    background: rgba(0, 167, 167, 0.25);
  }
  
  .react-calendar__month-view__days__day--weekend.react-calendar__tile--active {
    color: #d10000;
  }
  
  
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;


/* Manager Date Select */

export const TimeEntryManagerCalendar  = styled.div`
.react-calendar {
    width: 400px;
    height: fit-content;
    max-width: 100%;
    background: white;
    border-radius: 5%;
    font-family: "Inter", sans-serif;
    line-height: 1.125em;
    font-weight: 450;
    padding: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.35);
  }
  
  .react-calendar--doubleView {
    width: 700px;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer>* {
    width: 50%;
    margin: 0.5em;
  }
  
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }
  
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }
  
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }
  
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  
  .react-calendar__tile--now {
    background: #ffff76;
  }
  
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffff76;
  }
  
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  
  .react-calendar__tile--active {
    color: inherit;
  }
  
  
  .react-calendar__tile--active:enabled:focus {
    background: rgba(0, 167, 167, 0.25);
  }
  
  .react-calendar__month-view__days__day--weekend.react-calendar__tile--active {
    color: #d10000;
  }
  
  
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

