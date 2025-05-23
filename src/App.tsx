import React, { useState } from 'react';
import './App.css';
import MultiDropdown from './components/multi-dropdown';

const defaultOptions = [
  { label: 'Option 1', id: '1' },
  { label: 'Option 2', id: '2' },
  { label: 'Option 3', id: '3' },
];

function App() {
  const [state, setState] = useState<any[]>([]);
  const [options, setOptions] = useState(defaultOptions);

  const handleChange = (selected: any[]) => {
    setState(selected);
  };

  const handleCreate = (value: string) => {
    const newOption = { label: value, id: Math.random().toString(36).substring(2, 10) };
    setOptions([...options, newOption]);
  };

  return (
    <div className="App">
      <MultiDropdown
        options={options}
        onChange={handleChange}
        onCreate={handleCreate}
        value={state}
        itemsLabel={(item) => item.label}
        placeholder="Select options"
        width="300px"
      />
    </div>
  );
}

export default App;
