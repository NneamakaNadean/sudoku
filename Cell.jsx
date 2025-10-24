import React from 'react';

const Cell = ({ value, onChange }) => {
  // show empty string for 0 so inputs don't display 0
  const displayValue = value === 0 ? '' : value;

  const handleChange = (e) => {
    // allow only digits 1-9
    const cleaned = e.target.value.replace(/[^1-9]/g, '');
    // call parent's onChange with a synthetic event-like object so Board still reads target.value
    onChange({ target: { value: cleaned } });
  };

  return (
    <input
      type="text"
      className="cell"
      value={displayValue}
      onChange={handleChange}
      maxLength={1}
    />
  );
};

export default Cell;
