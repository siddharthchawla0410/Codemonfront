// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Codemon API types
export type ComplexityLevel =
  | 'single_file_single_thread'
  | 'multiple_files_single_thread'
  | 'asynchronous'
  | 'multithreading';

export interface Operation {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  complexity: ComplexityLevel;
}

export interface Language {
  id: number;
  name: string;
  slug: string;
}

export interface Snippet {
  id: number;
  language_id: number;
  operation_id: number;
  method: string;
  method_title: string;
  code: string;
  explanation: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// Common UI types
export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
}
