import { BaseComponent } from 'src/app/shared/component/base.component';
import { Employee } from './../../model/employee.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { map, Observable, takeWhile } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent extends BaseComponent {

  employees: Observable<Employee[]>;
  //dtOptions: DataTables.Settings = {};
  //@ViewChild('dtOptions', {static: true}) table;

  constructor(private employeeService: EmployeeService,
    private router: Router) {
      super();
  }

  override ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe({
        next: data => {
          console.log(data);
          this.employees = this.employeeService.getEmployees();
        },
        error: error => console.log(error),
        complete: () => console.log('Request complete')
      })
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
}
