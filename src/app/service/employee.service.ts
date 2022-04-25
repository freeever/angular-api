import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { Employee } from '../model/employee.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = '/api/employees/';

  getEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl + employee.id, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl + id);
  }
}
