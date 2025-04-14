import { Task } from '../types/task';
import { UserProfile } from '../types/user';

const API_BASE_URL = '/api';

class ApiService {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = await this.getAuthToken();
    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }

  private async getAuthToken(): Promise<string> {
    // Implement token retrieval from secure storage
    return '';
  }

  // Calendar endpoints
  async getWeeklyTasks(startDate: string, endDate: string): Promise<Task[]> {
    const response = await this.fetchWithAuth(`/tasks?start=${startDate}&end=${endDate}`);
    return response.json();
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const response = await this.fetchWithAuth('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async updateTask(taskId: string, task: Partial<Task>): Promise<Task> {
    const response = await this.fetchWithAuth(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.fetchWithAuth(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async shareTask(taskId: string, userIds: string[]): Promise<Task> {
    const response = await this.fetchWithAuth(`/tasks/${taskId}/share`, {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    });
    return response.json();
  }

  // User endpoints
  async getUserProfile(): Promise<UserProfile> {
    const response = await this.fetchWithAuth('/profile');
    return response.json();
  }

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const response = await this.fetchWithAuth('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return response.json();
  }

  async addFriend(friendId: string): Promise<void> {
    await this.fetchWithAuth('/friends', {
      method: 'POST',
      body: JSON.stringify({ friendId }),
    });
  }
}

export const apiService = new ApiService(); 