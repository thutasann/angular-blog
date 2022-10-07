import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';


class CustomValidators{
  static passwordContainsNumber(control: AbstractControl): ValidationErrors | any{
    const regex= /\d/;
    if(regex.test(control.value) && control.value !== null){
      return false;
    }
    else{
      return {
        passwordInvalid: true
      }
    }
  }

  static passwordMatches(control: AbstractControl): ValidationErrors | any{
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if((password === passwordConfirm) && (password !== null && passwordConfirm !== null)){
      return null;
    }else{
      return {
        passwordsNotMatching: true
      }
    }
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [
        null,[
          Validators.required,
          Validators.email,
          Validators.minLength(6)
      ]],
      password: [
        null, [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.passwordContainsNumber
        ]
      ],
      passwordConfirm: [
        null, [
          Validators.required
        ]
      ]
    }, {
      Validators: CustomValidators.passwordMatches
    })
  }


  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }

}
