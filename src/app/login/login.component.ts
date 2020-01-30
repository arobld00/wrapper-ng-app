import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login = false;
    user: '';
    password: '';

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
    }

    sendLogin(): void {
        const json = {user: this.user, password: this.password};
        console.log(json);
        this.apiService.sendLoginWrapper(json).subscribe(
        data => {
            this.router.navigate(['/tareas']);
        },
        err => {
            alert('An error has occurred while sending login');
        }
        );
    }

    public isLogged() {
        this.apiService.isLogged().subscribe(
            res => {
                this.login = true;
            },
            err => { alert('Acaba de ocurrir un error con el login!'); }
        );
    }

}
