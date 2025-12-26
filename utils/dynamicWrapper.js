// 1. Use this for any component causing hydration errors, especially those with MUI styling (like Typography, Button, or SvgIcon)
//2. For pages (e.g., in Blog.jsx), wrap the entire page component if it's MUI-intensive.

import dynamic from 'next/dynamic';

export function makeDynamic(Component, options = {}) {
  return dynamic(() => Promise.resolve(Component), { ssr: false, ...options });
}