import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm : FormGroup;
  hidePassword = true;
  hideCPassword = true;
  constructor(private fb:FormBuilder, private snackBar: MatSnackBar){
    this.signupForm=this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]},
      { validator: this.passwordMatchValidator }
    )
  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;
  }
  toggleCPasswordVisibility(){
    this.hideCPassword= !this.hideCPassword;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
      if (this.signupForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    console.log(this.signupForm.value);
    if (this.signupForm.errors?.['mismatch']) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    // Proceed with form submission
    this.snackBar.open('Form submitted successfully!', 'Close', { duration: 5000 });
  }
}

