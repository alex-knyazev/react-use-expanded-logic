import React, { useRef } from 'react';

export default function TestComponent() {
  const ref = useRef();
  return (
    <div ref={ref}>
      <h1>Content</h1>
    </div>
  );
}
