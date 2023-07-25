import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Toast } from 'shared/alerts';
import { DialogDataProduct, Sale } from 'shared/interfaces';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent {
  sales: Sale[] = []
  loading: boolean = true;
  constructor(
    protected service: SaleService,
    public dialog: MatDialog,
  ) {
  }

  reload() {
    this.loading = true
    this.service.list().subscribe(response => {
      this.loading = false
      this.sales = response.data.data
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
      .open(SaleDialog, {
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
}

@Component({
  selector: 'app-dialogo-sale-confirmacion',
  templateUrl: './sale-dialog.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class SaleDialog implements OnInit {
  loading: boolean = false;
  loadingProduct: boolean = false;
  errors: any = {};
  entity: Sale = {
    id: 0,
    id_user: 0,
    subtotal: 0,
    discount_rate: 0,
    total: 0,
    sale_date: '',

  }
  constructor(
    public dialog: MatDialogRef<SaleDialog>,
    protected service: SaleService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProduct) { }

  closeDialog(): void {
    this.dialog.close(false);
  }

  ngOnInit() {
    if (this.data.id > 0) {
      this.loadingProduct = true
      this.service.single(this.data.id).subscribe(sale => {
        this.entity = sale
        this.loadingProduct = false
      })
    }

  }



}
