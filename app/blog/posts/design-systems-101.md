---
title: "Design Systems 101: Foundations"
date: "2025-12-01"
category: "Design"
---

## What is a Design System?

Design systems are living collections of design tokens, components, patterns, documentation and usage guidance. They provide a shared language for designers and developers to build consistent UIs efficiently.

## Getting Started

Start with a small set of core tokens — colors, spacing, typography, and elevation — then extract common components (buttons, inputs, cards) into reusable pieces.

### Design Tokens

Tokens are single sources of truth for your system values. Example:

```typescript
export const tokens = {
  color: {
    brand: '#7c3aed',
    background: '#0b1020',
  },
  spacing: {
    sm: '8px',
    md: '16px',
  }
};
```

### Components & Documentation

Document usage, accessibility guidance, and variants so contributors understand how to use components and when not to.

## Scaling & Governance

Design systems become fragile if they don't have ownership or a contribution model. Define a lightweight governance model — a cross-functional maintainers group and a clear contribution process.

## Common Pitfalls

- Trying to solve everything at once — ship iteratively.
- Not documenting accessibility patterns.
- Allowing too many component variations.

Design systems are never finished; they evolve as your product and team grow.
