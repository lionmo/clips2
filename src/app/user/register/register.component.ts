import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name =  new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate])
  age =  new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
  confirm_password = new FormControl('', [Validators.required])
  phone = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)])

  showAlert = false
  alertMsg = 'Please wait your account is being created'
  alertColor = 'blue'
  inSubmission = false
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phone: this.phone
  }, [RegisterValidators.match('password', 'confirm_password')])

  constructor(private auth: AuthService, private emailTaken: EmailTaken) {

  }

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait your account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true
    try {
      await this.auth.createUser(this.registerForm.value)
    } catch (error) {
      console.error(error);

      this.alertMsg = "An unexpected error occurred, please try again later"
      this.alertColor = "red"
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success! Your account has been created'
    this.alertColor = 'green'
  }

}
