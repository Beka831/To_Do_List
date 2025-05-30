
# @monorepo/ui-components

A comprehensive UI components library built with React, TypeScript, and Tailwind CSS. This package provides reusable, accessible, and customizable components for building modern web applications.

## Components

### Core Components
- **Button**: Versatile button component with multiple variants and sizes
- **Card**: Flexible card component with header, content, and title subcomponents
- **Badge**: Status and category indicators with various styles
- **Input**: Form input with label and error handling
- **Modal**: Overlay dialogs for user interactions

### Data Components
- **DataTable**: Configurable table component for displaying structured data
- **Chart**: Simple chart components (bar, pie) for data visualization
- **ProgressBar**: Progress indicators with customizable variants

### Feedback Components
- **Notification**: Toast-style notifications with different types
- **Layout**: Application layout component with sidebar, header, and footer support

## Installation

```bash
npm install @monorepo/ui-components
```

## Usage

```typescript
import { Button, Card, Badge } from '@monorepo/ui-components';

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button variant="primary">Get Started</Button>
        <Badge variant="success">Active</Badge>
      </Card.Content>
    </Card>
  );
}
```

## Styling

This library uses Tailwind CSS for styling. Make sure your project has Tailwind CSS configured and includes the necessary design tokens.

## Development

```bash
npm run build    # Build the library
npm run dev      # Watch mode for development
```
