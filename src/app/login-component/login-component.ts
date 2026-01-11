import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth-service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  error = '';


 constructor(private authService:AuthService, private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onLogin(): void {
    if (this.loginForm.invalid) return;


    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.router.navigate(['/'])
        console.log(localStorage.getItem('token'));
      },

      error: (err) => {
        console.error('Erreur login:', err);
        this.error = err.error?.message || 'Erreur serveur';
      }
    });
  }






}
