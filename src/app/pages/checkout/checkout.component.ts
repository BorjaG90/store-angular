import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Order } from 'src/app/shared/intefaces/order.interface';
import { Store } from 'src/app/shared/intefaces/store.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  };
  isDelivery: boolean = false;
  stores: Store[] = [];

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.getStores();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      pickup: this.isDelivery,
    };

    this.dataSvc
      .saveOrder(data)
      .pipe(
        tap((res) => console.log('Order ->', res)),
        switchMap((order) => {
          const details = {};
          return this.dataSvc.saveDetailsOrder(details);
        }),
        tap((res) => console.log('Finish ->', res)),
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((stores: Store[]) => (this.stores = stores)))
      .subscribe();
  }

  private getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
