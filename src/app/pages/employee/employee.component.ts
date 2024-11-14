import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IParentDeptResponse, IParentDept, IChildDept, IChildDeptResponse } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  isformVisible = signal<boolean>(false);
  masterService = inject(MasterService);
  parentDeptList = signal<IParentDept[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDept();
  }

  getParentDept() {
    this.masterService.getAllParentDept().subscribe((res: IParentDeptResponse) => {
      this.parentDeptList.set(res.data);
    });
  }

  onParentDeptChange() {
    this.masterService.getChildDepartmentByParentId(this.parentDeptId).subscribe((res: IChildDeptResponse) => {
      this.childDeptList.set(res.data);
    });
  }

  onSave() {
    this.masterService.CreateEmployee(this.employeeObj).subscribe(
      (res: Employee) => {
        console.log(res);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

}
