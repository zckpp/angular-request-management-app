import { Component, OnInit } from '@angular/core';
import { CategoryGroup } from '../category';
import { FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map, startWith, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-form-category',
    templateUrl: './form-category.component.html',
    styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

    categoryForm = this.fb.group({
        system: ['', Validators.required],
        category_new: ['', Validators.required, this.validateCategory.bind(this)],
    }, {updateOn: 'blur'});

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
    ) { }

    // variable if request is successfully submitted
    succeed: boolean = null;
    // select value for choosing system of the categories
    categoryGroups$: Observable<CategoryGroup[]>;
    // list to show existing categories based on selected system
    categories_list$: Observable<CategoryGroup[]>;

    ngOnInit() {
        this.categoryGroups$ = this.apiService.readCategories();
        this.categories_list$ = this.categoryForm.get('system').valueChanges
            .pipe(
                //start with empty string to show all result
                startWith<string>(""),
                distinctUntilChanged(),
                switchMap(term => this.apiService.readCategories()
                    .pipe(
                        map(
                            (categorieGroups) => {
                              return categorieGroups.filter((categorieGroup) => { return categorieGroup.name.includes(term); });
                            }
                        ),
                    )
                ),
            );
    }

    // validating Category field for duplications
    validateCategory(input: AbstractControl) {
        const categoryValue = input.value;
        // return an object value for validator, making sure only validate categories in the same system
        // TODO: why cannot use categories_list$ here?
        return this.categoryGroups$.pipe(
            map(
                (categoryGroups) => {
                    return categoryGroups.filter((categoryGroup) => { return categoryGroup.name.includes(this.categoryForm.get('system').value); });
                }
            ),
            map(
                categoryGroups => {
                    let dupCategory = null;
                    categoryGroups.forEach(function (categoryGroup) {
                        categoryGroup.category.forEach(function (term) {
                            if(term.label.toLowerCase() === categoryValue.toLowerCase()) {
                                dupCategory = { dupCategory: true };
                            }
                        })
                    });
                    return dupCategory;
                }
            )
        );
    }

    // form on submit
    onSubmit() {
        let newRequest = this.categoryForm.value;
        this.apiService.createRequest(newRequest).subscribe((response: any) => {
            // status response configured in php app
            console.log(response.status);
            // if succeed, display success alert
            if (response.status == "succeed") this.succeed = true;
            else this.succeed = false;
            // refresh page in 3 seconds
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });

    }

}
