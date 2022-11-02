import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms'
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/username.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationForm!: FormGroup;

  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],  //first is default value, second is validations
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        pincode: ['']
      }),
      alternateEmails: this.fb.array([])
    },{validator: PasswordValidator});

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checkedValue=>{
      const email = this.registrationForm.get('email');
      if(checkedValue) {
        email?.setValidators(Validators?.required);
      } else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    })
  }

  title = 'reactive-forms';

  constructor(private fb: FormBuilder) {}

  //Form Builder usage
  

  // registrationForm = new FormGroup({
  //   username: new FormControl('Gaurav'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     pincode: new FormControl('')
  //   })
  // });

  loadApiData() {
    this.registrationForm.patchValue({    //values to few form controls
      username: 'Alex',
      password: 'test',
      confirmPassword: 'test'
    });

    // this.registrationForm.setValue({   //values for all form controls
    //   username: 'Alex',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     pincode: '123456'
    //   }
    // })
  }

}
