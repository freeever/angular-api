import { BaseComponent } from 'src/app/shared/component/base.component';
import { takeWhile } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent extends BaseComponent {

  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService) {
      super();
     }

  override ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe({
        next: data => console.log(data),
        error: error => console.log(error),
        complete: () => console.log('Request complete')
      });

    this.employee = new Employee();
    this.router.navigate(['/employees']);
    }


  list(){
    this.router.navigate(['employees']);
  }
}
