
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee.model';

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from '@angular/router';
import { takeWhile } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent extends BaseComponent {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
      super();
  }

  onSubmit() {
    this.submitted = true;

    this.employeeService.createEmployee(this.employee)
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe({
        next: data => console.log(data),
        error: error => console.log(error),
        complete: () => console.log('Request complete')
      })

    this.employee = new Employee();
    this.router.navigate(['/employees']);
  }
}
