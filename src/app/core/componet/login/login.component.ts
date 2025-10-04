import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn', 'false');
    if(localStorage.getItem('isLoggedIn') === 'true'){
      this.router.navigate(['/home/dashboard']);
    }
    else{
      this.router.navigate(['/login']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === "shakti" && this.loginForm.value.password === "shakti") {
        this.router.navigate(['/home/dashboard']);
        this.toastr.success("'Shakti', Login Successful");
        localStorage.setItem('isLoggedIn', 'true');
      }
      else {
        this.toastr.error("Please Enter Valid Credentials");
        localStorage.setItem('isLoggedIn', 'false');
      }
      this.loginForm.reset();
    }
  }
}
