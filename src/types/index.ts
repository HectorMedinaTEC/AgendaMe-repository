// User and Authentication
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Activity and Task Management
export interface Activity {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TimeBlock {
  id: string;
  activity_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
}

export interface Priority {
  id: string;
  activity_id: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface RecurringEvent {
  id: string;
  activity_id: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  end_date: string | null;
}

export interface CompletionHistory {
  id: string;
  activity_id: string;
  completed_date: string;
  notes: string | null;
}

// Redux State Slices
export interface ActivitiesState {
  items: Activity[];
  loading: boolean;
  error: string | null;
  selectedActivityId: string | null;
}

export interface TimeBlocksState {
  items: TimeBlock[];
  loading: boolean;
  error: string | null;
}

export interface PrioritiesState {
  items: Priority[];
  loading: boolean;
  error: string | null;
}

export interface RecurringEventsState {
  items: RecurringEvent[];
  loading: boolean;
  error: string | null;
}

export interface CompletionHistoryState {
  items: CompletionHistory[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  selectedDate: string | null;
  viewMode: 'month' | 'week' | 'day';
  showActivityModal: boolean;
  showTimeBlockModal: boolean;
  showDeleteConfirm: boolean;
  showSettingsModal: boolean;
  editingActivityId: string | null;
  filterStatus: string[];
  searchQuery: string;
  sidebarOpen: boolean;
  activityToDelete: string | null;
  currentView: 'month' | 'week' | 'day';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface GuestSession {
  token: string;
  expires_in: number;
}
