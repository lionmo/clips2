import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password:''
  }
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  inSubmission = false
  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  login= async () => {
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'blue'
    this.inSubmission = true
    try {
      await this.fireAuth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (error) {
      this.inSubmission = false
      this.alertMsg = 'An unexpected error occured. Please try again later'
      this.alertColor = 'red'
      console.error(error);
      return
    }
      this.alertMsg = `Success! You're now logged in.`
      this.alertColor = 'green'
    
    
    
  }

}
