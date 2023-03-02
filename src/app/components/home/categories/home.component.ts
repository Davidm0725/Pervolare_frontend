import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../services/category.service';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Code', 'Title', 'Description', 'Create date', 'Update date', 'Actions'];
  dataSource: any = [];
  crateDialog: boolean = false;
  category: any;
  submitted: boolean = false;
  formCreate: any;
  id: Number = 0;
  code: string = "";
  title: string = "";
  description: string = "";
  updateCategoryAction: boolean = false;

  constructor(public categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) {
    this.resetForm();

  }

  ngOnInit() {
    this.getCategories();
  }

  resetForm() {
    this.formCreate = this.fb.group({
      code: ['', [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getCategories() {
    this.categoryService.getCategories(`${urlBase}/categories`).subscribe(response => {
      this.dataSource = response.data;
    });
  }

  createCategory() {
    this.resetForm();
    this.id = 0;
    this.code = "";
    this.title = "";
    this.submitted = false;
    this.crateDialog = true;
  }

  deleteCategory(field: any) {
    this.categoryService.deleteCategories(`${urlBase}/categories`, { params: { id: field.id } }).subscribe(response => {
      if (response.status === 200) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.msg, life: 3000 });
        this.getCategories();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error.', life: 3000 });
      }
    });
  }

  saveCategory(form: FormGroup) {
    this.submitted = true;
    if (form.valid && !this.updateCategoryAction) {
      this.categoryService.createCategoty(`${urlBase}/categories`, { code: form.value.code, title: form.value.title, description: form.value.description }).subscribe(response => {
        if (response.status === 200) {
          this.getCategories();
          this.showMessage({ severity: 'success', detail: response.msg, summary: 'Successful' });
        } else {
          this.showMessage({ severity: 'error', detail: 'Internal server error.', summary: 'Error' });
        }
      });
    } else {
      this.categoryService.updateCategory(`${urlBase}/categories`, { id: this.id, code: form.value.code, title: form.value.title, description: form.value.description })
        .subscribe(response => {
          if (response.status === 200) {
            this.getCategories();
            this.showMessage({ severity: 'success', detail: response.msg, summary: 'Successful' });
          } else {
            this.showMessage({ severity: 'error', detail: 'Internal server error.', summary: 'Error' });
          }
        });
    }
    this.crateDialog = false;
  }

  showMessage(typeError: any) {
    const { severity, detail, summary } = typeError;
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }

  hideDialog() {
    this.crateDialog = false;
    this.submitted = false;
  }

  updateCategory(elemnt: any) {
    this.id = elemnt.id;
    this.code = elemnt.code;
    this.title = elemnt.title;
    this.description = elemnt.description;
    this.updateCategoryAction = true;
    this.submitted = false;
    this.crateDialog = true;

  }

}
