import React from 'react';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { Button } from '@hilla/react-components/Button.js';
import { useNavigate } from 'react-router-dom';

export default function PickLabelView() {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('../about');
  };

  const options = [
    { value: 'one', imgSrc: 'src/main/resources/META-INF/resources/images/boy1.jpg', label: 'one' },
    { value: 'two', imgSrc: 'src/main/resources/META-INF/resources/images/boy2.jpg', label: 'two' },
  ];

  return (
    <div className="flex flex-col h-full items-center justify-center p-l box-border" style={{ textAlign: 'left' }}>
      <RadioGroup label="Profile Photo" theme="horizontal">
        {options.map(option => (
          <RadioButton key={option.value} value={option.value}>
            <img src={option.imgSrc} alt={option.label} style={{ width: '50px', height: '50px' }} />
            <span>{option.label}</span>
          </RadioButton>
        ))}
      </RadioGroup>

      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}
