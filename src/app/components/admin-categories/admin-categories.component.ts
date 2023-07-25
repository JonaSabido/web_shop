import { Component, OnInit, Inject } from '@angular/core';
import { Category, DialogDataProduct, Product } from 'shared/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { Confirm, Toast } from 'shared/alerts';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = []
  loading: boolean = true;
  constructor(
    protected service: CategoryService,
    public dialog: MatDialog,
  ) {

  }

  reload() {
    this.loading = true
    this.service.list().subscribe(response => {
      this.loading = false
      this.categories = response.data.data
    })
  }



  ngOnInit(): void {
    this.reload()
  }

  openDialog(type: 'new' | 'edit', id: number = 0): void {

    const dialogData: DialogDataProduct = {
      id: id,
      type: type
    };
    this.dialog
      .open(CategoryDialog, {
        data: dialogData,
        width: '60%',
        panelClass: '',
        height: '80%',
        autoFocus: true
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.reload()
        }
      });
  }

  delete(name: string, id: number) {
    Confirm.fire({
      title: '¿Esta seguro que desea eliminar la categoría: ' + name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.service.destroy(id).subscribe(response => {
          Toast.fire({
            icon: 'success',
            title: 'Categoría eliminado correctamente',
          })
          this.reload()
        },
          error => {
            Toast.fire({
              icon: 'error',
              title: 'Error al eliminar la categoría'
            });
          }
        )
      }

    })
  }

}

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class CategoryDialog implements OnInit {
  srcResult = ''
  loading: boolean = false;
  loadingCategory: boolean = false;
  errors: any = {};
  entity: Category = {
    id: 0,
    name: '',
    active: true,
    products: []
  }
  constructor(
    public dialog: MatDialogRef<CategoryDialog>,
    protected service: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProduct) { }

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    if (this.data.type === 'new') {
      this.loading = true;
      this.service.store(this.entity).subscribe(
        response => {
          this.loading = false;
          Toast.fire({
            icon: 'success',
            title: 'Categoría creada',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al crear la categoría'
          });
        }
      )
    }
    else if (this.data.type === 'edit') {
      this.loading = true;
      this.service.update(this.entity.id, this.entity).subscribe(
        response => {
          this.loading = false;
          Toast.fire({
            icon: 'success',
            title: 'Categoría actualizado',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al actualizar la categoría'
          });
        }
      )
    }

  }



  ngOnInit() {
    if (this.data.id > 0) {
      this.loadingCategory = true
      this.service.single(this.data.id).subscribe(product => {
        this.entity = product
        this.loadingCategory = false
      })
    }

  }



  get checkModel() {
    return !(this.entity.name == null ||  this.entity.active == null)
  }
}