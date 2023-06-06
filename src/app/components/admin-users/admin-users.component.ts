import { Component, OnInit, Inject } from '@angular/core';
import { Category, DialogDataProduct, Product, Profile, User } from 'shared/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { Confirm, Toast } from 'shared/alerts';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = []
  loading: boolean = true;
  currenUser: any; 
  constructor(
    protected authService: AuthService,
    protected service: UserService,
    public dialog: MatDialog,
  ) {
    this.currenUser = authService.getDecodeToken()
  }

  reload() {
    this.loading = true
    this.service.list().subscribe(response => {
      this.loading = false  
      this.users = response.data.data
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
      .open(UserDialog, {
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
      title: '¿Esta seguro que desea eliminar el usuario: ' + name + '?',
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
            title: 'Usuario eliminado correctamente',
          })
          this.reload()
        },
          error => {
            Toast.fire({
              icon: 'error',
              title: 'Error al eliminar el usuario'
            });
          }
        )
      }

    })
  }

}

@Component({
  selector: 'app-dialogo-user-confirmacion',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class UserDialog implements OnInit {
  profiles: Profile[] = []
  loading: boolean = false;
  loadingProduct: boolean = false;
  errors: any = {};
  entity: User = {
    id: 0,
    name: '',
    id_profile: 0,
    active: 1,
    nick: '',
    last_name: '',
    email: '',
    password: ''
  }
  constructor(
    public dialog: MatDialogRef<UserDialog>,
    protected service: UserService,
    protected profileService: ProfileService,
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
            title: 'Usuario creado',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al crear el usuario'
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
            title: 'Usuario actualizado',
          });
          this.dialog.close(true);
        },
        error => {
          this.loading = false;
          if (error.status == 400) this.errors = error.error.data
          Toast.fire({
            icon: 'error',
            title: 'Error al actualizar el usuario'
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
    this.profileService.list().subscribe(response => {
      this.profiles = response.data.data
    })

  }



  get checkModel() {
    return !(this.entity.id_profile == 0 || this.entity.name == '' || this.entity.last_name == ''
      || this.entity.nick == '' || this.entity.password == '' || this.entity.email == '' || this.entity.active == null)
  }
}