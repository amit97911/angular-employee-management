import { HttpClient } from '@angular/common/http';
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
    deptId = 5150 //Keeping static as this Id has data for test
    return this.http.get<IChildDeptResponse>(`${this.apiUrl}Complaint/GetChildDepartmentByParentId?deptId=${deptId}`)
  }

  CreateEmployee(employeeObj: Employee): Observable<Employee> {
    employeeObj.createdDate = new Date().toISOString();
    console.log(employeeObj);
    return this.http.post<Employee>(`${this.apiUrl}EmployeeManagement/CreateEmployee`, employeeObj)
  }

  


}
