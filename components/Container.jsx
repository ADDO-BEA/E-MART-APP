'use client';
import React from 'react';

// Utility function to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Container component
function Container({ children, className }) {
  return (
    <div className={cn('max-w-screen-xl mx-auto px-4', className)}>
      {children}
    </div>
  );
}

export default Container;
