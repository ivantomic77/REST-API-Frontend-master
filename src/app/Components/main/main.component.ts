import { Component, OnInit, Output } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/Customer';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  customers!: Customer[];
  jsonNames!: string[];
  reqType:string = 'POST';
  customer: any = new FormData();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    //this.customerService.getCustomers().subscribe((customers) => (this.customers = customers));
    this.customerService.getCustomers().subscribe((customers) => (this.customers = customers));
    this.customerService.getCustomers().subscribe((customers) => (this.jsonNames = Object.keys(customers[0])));
  }

  downloadFile(id:number):void{
    this.customerService.getFile(id);
  }

  deleteCustomer(id:number){
    window.location.reload();
    this.customerService.deleteCustomer(id).subscribe();
  }

  replaceCustomer(customer:Customer){
    this.customer.set('id', customer.id);
    this.customer.set('firstName', customer.firstName);
    this.customer.set('lastName', customer.lastName);
    this.customer.set('active', customer.active);
  }
}
