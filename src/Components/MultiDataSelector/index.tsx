import React from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './multiDataSelector.module.css';
import ptBR from 'date-fns/locale/pt-BR';
interface Props {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  selectedPeriod1Times: { date: Date; startTime: string; endTime: string }[];
  setSelectedPeriod1Times: (index: number, startTime: string, endTime: string) => void;
  selectedPeriod2Times: { date: Date; startTime: string; endTime: string }[];
  setSelectedPeriod2Times: (index: number, startTime: string, endTime: string) => void;
  horariosDisponiveis: string[];
}

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

const MultiDateSelector: React.FC<Props> = ({
  selectedDates,
  setSelectedDates,
  selectedPeriod1Times,
  setSelectedPeriod1Times,
  selectedPeriod2Times,
  setSelectedPeriod2Times,
  horariosDisponiveis,
}) => {
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setSelectedDates([date]);
    }
  };

  const handleTimeChange = (period: number, index: number, startTime: string, endTime: string) => {
    if (period === 1) {
      setSelectedPeriod1Times(index, startTime, endTime);
    } else if (period === 2) {
      setSelectedPeriod2Times(index, startTime, endTime);
    }
  };

  const today = new Date();

  return (
    <div className={styles.container}>
      <DatePicker
        locale="pt-BR"
        onChange={handleDateChange}
        selected={null}
        dateFormat="dd/MM/yyyy"
        inline
        placeholderText="Selecione uma data"
        showMonthDropdown
        showYearDropdown
        calendarClassName={styles.datePicker}
        dropdownMode="select"
        excludeDates={selectedDates}
        minDate={today}
      />
      {selectedDates.map((selectedDate, index) => (
        <div key={index} className={styles.dateContainer}>
          <div className={styles.date}>{selectedDate.toLocaleDateString()}</div>
          <div>
            <select
              className={styles.select}
              value={selectedPeriod1Times[index]?.startTime || ''}
              onChange={(e) => {
                const startTime = e.target.value;
                const endTime = selectedPeriod1Times[index]?.endTime || '';
                handleTimeChange(1, index, startTime, endTime);
              }}
            >
              <option value="">Hora de início (Período 1)</option>
              {horariosDisponiveis.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={selectedPeriod1Times[index]?.endTime || ''}
              onChange={(e) => {
                const startTime = selectedPeriod1Times[index]?.startTime || '';
                const endTime = e.target.value;
                handleTimeChange(1, index, startTime, endTime);
              }}
            >
              <option value="">Hora de término (Período 1)</option>
              {horariosDisponiveis.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className={styles.select}
              value={selectedPeriod2Times[index]?.startTime || ''}
              onChange={(e) => {
                const startTime = e.target.value;
                const endTime = selectedPeriod2Times[index]?.endTime || '';
                handleTimeChange(2, index, startTime, endTime);
              }}
            >
              <option value="">Hora de início (Período 2)</option>
              {horariosDisponiveis.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={selectedPeriod2Times[index]?.endTime || ''}
              onChange={(e) => {
                const startTime = selectedPeriod2Times[index]?.startTime || '';
                const endTime = e.target.value;
                handleTimeChange(2, index, startTime, endTime);
              }}
            >
              <option value="">Hora de término (Período 2)</option>
              {horariosDisponiveis.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiDateSelector;
