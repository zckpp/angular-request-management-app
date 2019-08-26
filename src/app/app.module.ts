import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from  '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestListComponent } from './dashboard/request-list/request-list.component';
import { SortableDirective } from './sortable.directive';
import { FormRequestComponent } from './form-request/form-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardGrantComponent } from './dashboard-grant/dashboard-grant.component';
import { RequestListGrantComponent } from './dashboard-grant/request-list-grant/request-list-grant.component';
import { SearchComponent } from './search/search.component';
import { RequestListSearchComponent } from './search/request-list-search/request-list-search.component';
import { FormCategoryComponent } from './form-category/form-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RequestListComponent,
    SortableDirective,
    FormRequestComponent,
    DashboardGrantComponent,
    RequestListGrantComponent,
    SearchComponent,
    RequestListSearchComponent,
    FormCategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }