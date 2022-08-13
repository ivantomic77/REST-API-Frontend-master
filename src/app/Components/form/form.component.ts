import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { Customer } from 'src/app/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onAddCustomer: EventEmitter<Customer> = new EventEmitter();
  myForm!: FormGroup;
  @Input() reqType: string = 'POST';
  @Input() customer!: FormData;

  constructor(private customerService: CustomerService, private fb:FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      active: [false, Validators.required],
      file: [null, Validators.required]
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    if(this.reqType === 'POST'){
      this.customer.set('firstName', this.myForm.controls['firstName'].value);
      this.customer.set('lastName', this.myForm.controls['lastName'].value);
      this.customer.set('active', this.myForm.controls['active'].value);
      this.customer.set('file', this.myForm.controls['file'].value);
      this.customerService.postCustomer(this.customer).subscribe();
    }
    if(this.reqType === 'PUT'){
      // TO DO: Load data into form input fields

      this.customer.set('firstName', this.myForm.controls['firstName'].value || this.customer.get('firstName'));
      this.customer.set('lastName', this.myForm.controls['lastName'].value || this.customer.get('lastName'));
      this.customer.set('active', this.myForm.controls['active'].value || this.customer.get('active'));
      this.customer.set('file', this.myForm.controls['file'].value || this.customer.get('file'));
      this.customerService.updateCustomer(this.customer).subscribe();
    }

    this.myForm.reset();
  }
  onFileChange(event:any){
    const file = event.target.files[0];
    this.myForm.patchValue({file: file});
  }

  // GETTERS
  get firstName() {
    return this.myForm.get('firstName');
  }
  get lastName() {
    return this.myForm.get('lastName');
  }
  get active() {
    return this.myForm.get('active');
  }
  get file() {
    return this.myForm.get('file');
  }
}
