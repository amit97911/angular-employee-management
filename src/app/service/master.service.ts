import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParentDeptResponse, IChildDeptResponse } from '../model/interface/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/Complaint/';
  constructor(private http: HttpClient) { }

  getAllParentDept(): Observable<IParentDeptResponse> {
    return this.http.get<IParentDeptResponse>(`${this.apiUrl}GetParentDepartment`)
  }

  getChildDepartmentByParentId(deptId: number): Observable<IChildDeptResponse> {
    deptId = 5150 //Keeping static as this Id has data for test
    return this.http.get<IChildDeptResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptId}`)
  }


}
