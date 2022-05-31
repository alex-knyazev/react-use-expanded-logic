import React, { useState, useRef, useEffect } from 'react';

export default function TestComponent() {
  const ref = useRef();
  const { expanded, fits, setExpanded } = useExpandedLogic({
    ref,
    maxHeight: 50,
  });

  const [text, setText] = useState('');

  useEffect(() => {
    setInterval(() => {
      increaseText();
    }, 2000);
  }, []);

  function increaseText() {
    setText((textValue) => {
      if (textValue.length > 100) {
        return '';
      } else {
        return textValue + '123456789 ';
      }
    });
  }
  const style = expanded
    ? null
    : {
        overflowY: 'hidden',
        maxHeight: 40,
      };

  return (
    <div style={{ width: 200 }}>
      <div ref={ref} style={style}>
        <p>{text}</p>
      </div>
      {!fits ? null : (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Свернуть' : 'Развернуть'}
        </button>
      )}
    </div>
  );
}

function useExpandedLogic({ ref, maxHeight }) {
  const [fits, setFits] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResized);
    resizeObserver.observe(ref.current.firstChild);
  }, []);

  function handleResized() {
    const newFitsValue = ref.current.firstChild.offsetHeight >= maxHeight;
    setFits(newFitsValue);
  }

  return {
    expanded,
    setExpanded,
    fits,
  };
}
