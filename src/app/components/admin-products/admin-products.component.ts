import { Component, OnInit, Inject } from '@angular/core';
import { Category, DialogDataProduct, Product } from 'shared/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { Confirm, Toast } from 'shared/alerts';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = []
  loading: boolean = true;
  constructor(
    protected service: ProductService,
    public dialog: MatDialog,
  ) {

  }

  reload() {
    this.loading = true
    this.service.list().subscribe(response => {
      this.loading = false
      this.products = response.data.data
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
      .open(ProductDialog, {
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
      title: '¿Esta seguro que desea eliminar el producto: ' + name + '?',
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
            title: 'Producto eliminado correctamente',
          })
          this.reload()
        },
          error => {
            Toast.fire({
              icon: 'error',
              title: 'Error al eliminar el producto'
            });
          }
        )
      }

    })
  }

}

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class ProductDialog implements OnInit {
  categories: Category[] = []
  srcResult = ''
  loading: boolean = false;
  loadingProduct: boolean = false;
  errors: any = {};
  entity: Product = {
    id: 0,
    name: '',
    description: null,
    price: 0,
    stock: 0,
    id_category: 0,
    url: '',
    active: 1,
    amount: 0,
    subtotal: 0
  }
  constructor(
    public dialog: MatDialogRef<ProductDialog>,
    protected service: ProductService,
    protected categoryService: CategoryService,
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
            title: 'Producto creado',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al crear el producto'
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
            title: 'Producto actualizado',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al actualizar el producto'
          });
        }
      )
    }

  }



  ngOnInit() {
    if (this.data.id > 0) {
      this.loadingProduct = true
      this.service.single(this.data.id).subscribe(product => {
        this.entity = product
        this.loadingProduct = false
      })
    }
    this.categoryService.list().subscribe(response => {
      this.categories = response.data.data
    })

  }



  get checkModel() {
    return !(this.entity.id_category == null || this.entity.name == '' || this.entity.description == ''
      || this.entity.price == null || this.entity.url == '' || this.entity.stock == null || this.entity.active == null)
  }
}