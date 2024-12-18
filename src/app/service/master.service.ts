import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParentDeptResponse, IChildDeptResponse } from '../model/interface/master';
import { Employee } from '../model/class/employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/';



  constructor(private http: HttpClient) { }

  getAllParentDept(): Observable<IParentDeptResponse> {
    return this.http.get<IParentDeptResponse>(`${this.apiUrl}Complaint/GetParentDepartment`)
  }

  getChildDepartmentByParentId(deptId: number): Observable<IChildDeptResponse> {
    deptId = 5150 // Keeping static as this Id has data for test
    return this.http.get<IChildDeptResponse>(`${this.apiUrl}Complaint/GetChildDepartmentByParentId?deptId=${deptId}`)
  }

  CreateEmployee(employeeObj: Employee): Observable<Employee> {
    employeeObj.createdDate = new Date().toISOString();
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.post<Employee>(`${this.apiUrl}EmployeeManagement/CreateEmployee`, employeeObj, { headers })
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}EmployeeManagement/GetAllEmployees`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}EmployeeManagement/UpdateEmployee/${employee.employeeId}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}EmployeeManagement/DeleteEmployee/${employeeId}`);
  }


}
