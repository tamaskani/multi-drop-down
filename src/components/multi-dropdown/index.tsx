import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowDown, FaCheck } from 'react-icons/fa';
import styles from './index.module.scss';
import { IconButton } from '../icon-button';

type MultiDropdownTypes = {
  options: any[];
  onChange: (selected: any[]) => void;
  value: any[];
  onCreate?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  renderItem?: (item: any) => React.ReactNode;
  itemsLabel?: (item: any) => string;
  width?: string;
};

const convertArrayToObject = (array: any[]) => {
  return array.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

const MultiDropdown: React.FC<MultiDropdownTypes> = ({
  options,
  onChange,
  value,
  onCreate,
  placeholder = 'choose...',
  disabled = false,
  renderItem,
  itemsLabel,
  width,
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const valueObj = useMemo(() => convertArrayToObject(value), [value]);

  const getItemsLabel = (option: any) => (itemsLabel ? itemsLabel(option) : option.label);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onCreate) {
      onCreate(e.currentTarget.value);
      setText('');
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const handleChange = useCallback(
    (option: any) => {
      if (valueObj[option.id]) {
        onChange(value.filter((item) => item.id !== option.id));
        return;
      }
      onChange([...value, option]);
    },
    [value, valueObj, onChange]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={styles['multi-dropdown-root']} style={{ width }}>
      <div className={styles['multi-dropdown-input-container']}>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles['multi-dropdown-input']}
          value={text}
          onChange={handleChangeText}
        />
        <IconButton
          onClick={() => setOpen(!open)}
          disabled={disabled}
          className={styles['multi-dropdown-button']}
        >
          <FaArrowDown />
        </IconButton>
      </div>
      {open && !options.length && <div>empty</div>}
      {open && options.length && (
        <ul className={styles['multi-dropdown-list']}>
          {options.map((option) => (
            <li
              onClick={() => handleChange(option)}
              className={`${styles['multi-dropdown-list-item']} ${valueObj[option.id] ? styles['multi-dropdown-list-item-selected'] : ''}`}
              key={option.id}
            >
              <div>{getItemsLabel(option)}</div>
              <div>
                {value.some((item) => item.id === option.id) && <FaCheck />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
