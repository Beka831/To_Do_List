
# @monorepo/utils

A comprehensive utility library providing essential functions for common development tasks including date manipulation, string processing, API handling, validation, storage, mathematics, array operations, and formatting.

## Installation

```bash
npm install @monorepo/utils
```

## Modules

### Date Utilities
```typescript
import { formatDate, getDaysFromNow, getRelativeTime, addDays } from '@monorepo/utils';

formatDate(new Date(), 'long'); // "Monday, January 1, 2024"
getDaysFromNow('2024-12-31'); // Days until date
getRelativeTime(new Date(Date.now() - 3600000)); // "1h ago"
```

### String Utilities
```typescript
import { capitalize, camelCase, truncate, slugify } from '@monorepo/utils';

capitalize('hello world'); // "Hello world"
camelCase('hello world'); // "helloWorld"
truncate('Long text here', 10); // "Long te..."
slugify('Hello World!'); // "hello-world"
```

### API Utilities
```typescript
import { createApiClient, retry, delay } from '@monorepo/utils';

const api = createApiClient('https://api.example.com');
const response = await api.get('/users');

// Retry mechanism
await retry(async () => {
  return api.get('/unreliable-endpoint');
}, 3, 1000);
```

### Validation Utilities
```typescript
import { isEmail, isStrongPassword, validateEmail } from '@monorepo/utils';

isEmail('user@example.com'); // true
isStrongPassword('SecurePass123!'); // true
validateEmail('invalid-email'); // "Please enter a valid email address"
```

### Storage Utilities
```typescript
import { setStorageItem, getStorageItem } from '@monorepo/utils';

setStorageItem('user', { name: 'John', id: 1 });
const user = getStorageItem('user'); // { name: 'John', id: 1 }
```

### Math Utilities
```typescript
import { round, clamp, percentage, average } from '@monorepo/utils';

round(3.14159, 2); // 3.14
clamp(150, 0, 100); // 100
percentage(25, 100); // 25
average([1, 2, 3, 4, 5]); // 3
```

### Array Utilities
```typescript
import { unique, groupBy, sortBy, chunk } from '@monorepo/utils';

unique([1, 2, 2, 3]); // [1, 2, 3]
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
groupBy(users, user => user.department);
sortBy(users, 'name');
```

### Format Utilities
```typescript
import { formatCurrency, formatBytes, formatDuration } from '@monorepo/utils';

formatCurrency(1234.56); // "$1,234.56"
formatBytes(1024); // "1 KB"
formatDuration(90000); // "1m 30s"
```

## Development

```bash
npm run build    # Build the library
npm run dev      # Watch mode for development
```

## Features

- 🚀 **Performance**: Optimized utility functions
- 📦 **Tree-shakable**: Import only what you need
- 🔒 **Type-safe**: Full TypeScript support
- 🧪 **Tested**: Comprehensive test coverage
- 📚 **Well-documented**: Clear examples and API docs
