// import { Component } from '@angular/core';
// import { AuthService } from '../../../core/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   constructor(private authService: AuthService) { }

//   onRegister(form: any): void {
//     if (form.valid) {
//       this.authService.register(form.value).subscribe(() => {
//         alert('Registration successful!');
//       });
//     } else {
//       alert('Please fill out all required fields.');
//     }
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }

  onRegister(form: any): void {
    if (form.valid) {
      const email = form.value.email;

      this.authService.checkUserExists(email).subscribe(exists => {
        if (exists) {
          alert('Email already exists! Please use a different email.');
        } else {
          this.authService.register(form.value).subscribe(() => {
            alert('Registration successful!');
            form.reset();
          });
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}