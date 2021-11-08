import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { USERS } from '../common/Mocks/LoginDB';
import { AlertService } from '../core/services/alert.service';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  public subscription: any;
  constructor(private fb:FormBuilder,private router:Router,private alertService:AlertService,private authService:AuthUserService,private platform:Platform) { }

  ngOnInit() {
    this.initForm();
  }

  login(){
    console.log(this.loginForm.value);
    let loginData=this.loginForm.value;
    let user=USERS.find((user)=>{
      return user.username==loginData.username && user.password==loginData.password;
    })
    if(user){
      this.authService.setUserDetails('data',JSON.stringify(user));
      // this.router.navigate(['/folder/Inbox']);
      this.router.navigate(['/ask-role'])
    } else {
      this.alertService.presentAlert("Inalid username or password","Error");
    }
    // this.authService.login(form.value).subscribe((res)=>{
    //   this.router.navigateByUrl('home');
    // });
  }

  initForm(){
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      // navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
