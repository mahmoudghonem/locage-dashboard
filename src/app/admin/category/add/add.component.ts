import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../../Services/Category.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  categories: Category[];
  formData: FormData = new FormData(); 

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((result: any) => {
      this.categories = result.result;
    });
  }

  onfileselected(event: any){
    const selectedfile = event.target.files[0];
    this.formData.append('photo', selectedfile, selectedfile.name);
  }

  onAddCategory(categoryForm: NgForm, categorySpinner: any, additionConfirmation: any) {
    additionConfirmation.style.display = 'none';
    categorySpinner.style.display = 'block';
    this.formData.append('name', categoryForm.value.name.toString());
    this.categoryService.addCategory(this.formData).subscribe((result: any) => {
      categorySpinner.style.display = 'none';
      additionConfirmation.style.display = 'block';
      categoryForm.reset();
      this.ngOnInit();
      this.formData.delete('name');
    },
    (error: Error) => {
      this.formData.delete('name');
    });
  }

  /* ------------------------------------------------------------------------------------------------------------ */

  onSubcategoryImageSelect(event: any) {
    const selectedfile = event.target.files[0];
    this.formData.append('photo', selectedfile, selectedfile.name);
  }

  onAddSubcategory(subcategoryForm: NgForm, subcategorySpinner: any, subAdditionConfirmation: any) {
    subAdditionConfirmation.style.display = 'none';
    subcategorySpinner.style.display = 'block';
    this.formData.append('name', subcategoryForm.value.subname.toString());
    this.categoryService.addSubcategory(this.formData, subcategoryForm.value.categoryId).subscribe((result: any) => {
      subcategorySpinner.style.display = 'none';
      subAdditionConfirmation.style.display = 'block';
      subcategoryForm.reset();
      this.formData.delete('name');
    },
    (error: Error) => {
      this.formData.delete('name');
    });
  }


}
