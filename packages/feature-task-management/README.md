
# @monorepo/feature-task-management

A comprehensive task management feature package built with React and TypeScript. This package provides a complete task management system with filtering, statistics, and multiple views.

## Features

### 🎯 Task Management
- Create, update, and delete tasks
- Task status tracking (Todo, In Progress, Review, Done)
- Priority levels (Low, Medium, High, Urgent)
- Progress tracking with visual indicators
- Due date management with overdue detection
- Tag system for categorization
- Assignee management

### 📊 Analytics & Reporting
- Real-time task statistics
- Status distribution charts
- Priority distribution visualization
- Completion rate tracking
- Average progress monitoring
- Overdue task alerts

### 🔍 Advanced Filtering
- Filter by status, priority, assignee
- Tag-based filtering
- Date range filtering
- Multiple filter combinations

### 🎨 Multiple Views
- Card view for visual task management
- Table view for detailed data display
- Responsive design for all screen sizes

## Components

### Core Components
- **TaskManager**: Main container component with layout and state management
- **TaskList**: Displays tasks in card or table format
- **TaskCard**: Individual task card with actions and progress
- **TaskForm**: Create and edit task modal form
- **TaskFilters**: Advanced filtering sidebar
- **TaskStats**: Real-time statistics and charts

### Hooks
- **useTasks**: Task management with CRUD operations and filtering
- **useTaskStats**: Real-time statistics calculation

### Services
- **TaskService**: Data persistence and API simulation

## Installation

```bash
npm install @monorepo/feature-task-management
```

## Usage

```typescript
import { TaskManager } from '@monorepo/feature-task-management';

function App() {
  return (
    <div className="min-h-screen">
      <TaskManager />
    </div>
  );
}
```

### Individual Components

```typescript
import { TaskList, TaskForm, useTasks } from '@monorepo/feature-task-management';

function CustomTaskApp() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  return (
    <div>
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
      <TaskForm onSubmit={addTask} />
    </div>
  );
}
```

## Data Persistence

Tasks are automatically saved to localStorage and restored on application load. The service layer can be easily extended to support:
- REST APIs
- GraphQL endpoints
- Real-time databases
- Cloud storage

## Customization

### Styling
All components use Tailwind CSS classes and can be customized through className props or by overriding the default styles.

### Task Schema
The task structure is fully typed and can be extended:

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
  tags: string[];
  progress: number;
}
```

## Development

```bash
npm run build    # Build the package
npm run dev      # Watch mode for development
```

## Dependencies

- `@monorepo/ui-components`: UI component library
- `@monorepo/utils`: Utility functions
- `react`: React framework
- `typescript`: Type safety
