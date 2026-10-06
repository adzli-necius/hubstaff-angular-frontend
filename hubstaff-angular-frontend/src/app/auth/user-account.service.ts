import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';

const API_URL = `${API_BASE_URL}/auth/users`;

export interface CreateUserRequest {
  employeeId: number;
  email: string;
  password: string;
  roles: string[];
}

export interface CreatedUser {
  id: number;
  employeeId: string;
  name: string;
  roles: string[];
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class UserAccountService {
  private readonly http = inject(HttpClient);

  createUser(request: CreateUserRequest): Observable<ApiResponse<CreatedUser>> {
    return this.http.post<ApiResponse<CreatedUser>>(API_URL, request);
  }
}
