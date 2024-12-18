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
  allEmployeeList = signal<Employee[]>([]);

  ngOnInit(): void {
    this.getParentDept();
    this.getAllEmployee();
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
    this.masterService.CreateEmployee(this.employeeObj).subscribe({
      next: (res: Employee) => {
        console.log("onSave next", res);
        this.getAllEmployee();
        this.employeeObj = new Employee();
        console.log("dddd", this.employeeObj);
      },
      error: (error: any) => {
        console.log("onSave error", error);
      }
    });
  }

  getAllEmployee() {
    this.masterService.getAllEmployee().subscribe({
      next: (res: Employee[]) => {
        this.allEmployeeList.set(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onEdit(employee: Employee) {
    this.isformVisible.set(true);
    this.employeeObj = employee;
  }

  onDelete(employeeId: number) {
    const allowDelete = confirm("Are you sure?");
    if (allowDelete) {
      this.masterService.deleteEmployee(employeeId).subscribe({
        next: (res: Employee) => {
          console.log(res);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  onUpdate(employee: Employee) {
    this.masterService.updateEmployee(employee).subscribe({
      next: (res: Employee) => {
        console.log(res);
        this.getAllEmployee();
        this.employeeObj = new Employee();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
