import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  private async handleRequest<T = any>(observable: Observable<{ data: T }>): Promise<T> {
    try {
      const response = await lastValueFrom(observable);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message || 'Internal server error';
      throw new HttpException(message, status);
    }
  }

  get<T = any>(url: string) {
    return this.handleRequest<T>(this.httpService.get(url));
  }

  post<T = any>(url: string, body: any) {
    return this.handleRequest<T>(this.httpService.post(url, body));
  }

  put<T = any>(url: string, body: any) {
    return this.handleRequest<T>(this.httpService.put(url, body));
  }

  delete<T = any>(url: string) {
    return this.handleRequest<T>(this.httpService.delete(url));
  }
}
