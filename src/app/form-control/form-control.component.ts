import { Component, OnInit } from '@angular/core';
import { managers, Manager } from '../manager';
import { categories, Category } from '../category';
import { FormGroupDirective, NgForm, FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { ApiService } from '../api.service';

// making sure user choose from the manager list
export function validateManager(input: FormControl) {
  const managerName = input.value;
  for (let manager of managers) {
    if (manager.name == managerName) return null;
  }
  return { notInList: true };
}

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  requestForm = this.fb.group({
    id: [null],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    category: ['', Validators.required],
    manager: ['', [Validators.required, validateManager]],
  });

  constructor(
      private fb: FormBuilder,
      private apiService: ApiService,
  ) { }

  // variables

  // import manager and category field data
  managers: Manager[] = managers;
  categories: Category[] = categories;

  // init autocomplete field: manager
  filteredOptions: Observable<Manager[]>;

  // variable if request is successfully submitted
  succeed = null;

  ngOnInit() {
    this.filteredOptions = this.requestForm.get('manager').valueChanges
        .pipe(
            startWith<string | Manager>(""),
            debounceTime(500),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.managers.slice()),
        );
  }

  // methods

  // autocomplete field method
  private _filter(name: string): Manager[] {
    const filterValue = name.toLowerCase();
    return this.managers.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  // form on submit
  onSubmit() {
    let newRequest = this.requestForm.value;
    this.apiService.createRequest(newRequest).subscribe((response: any) => {
      // status response configured in php app
      console.log(response.status);
      // if succeed, display success alert
      if (response.status == "pending") this.succeed = true;
      else this.succeed = false;
      // refresh page in 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    });
  }
}
