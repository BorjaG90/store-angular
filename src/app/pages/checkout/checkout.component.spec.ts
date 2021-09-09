import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ProductsService } from '../products/services/products.service';

import { CheckoutComponent } from './checkout.component';
import { DetailsComponent } from './details/details.component';

import { By } from '@angular/platform-browser';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent, DetailsComponent],
      providers: [ProductsService, ShoppingCartService, DataService],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two radio buttons', async () => {
    const radioButtons = fixture.debugElement.queryAll(
      By.css('.mat-radio-button')
    );

    expect(component.isDelivery).toBeTrue;
    expect((await radioButtons).length).toBe(2);
  });

  it('isDelivery must be false when select pickup radio button', async () => {
    const pickupRadioButton = fixture.debugElement.query(
      By.css('[data-testid="pickup-radio-button"]')
    );

    expect(component.isDelivery).toBeTrue;
    expect(pickupRadioButton.nativeElement.checked).toBeFalse;
    expect(pickupRadioButton.nativeElement.checked).toBeTrue;
    await pickupRadioButton.triggerEventHandler('click', null);
    expect(pickupRadioButton.nativeElement.checked).toBeTrue;
    expect(component.isDelivery).toBeFalse;
  });

  it('isDelivery must be true when select delivery radio button', async () => {
    const deliveryRadioButton = fixture.debugElement.query(
      By.css('[data-testid="delivery-radio-button"]')
    );

    expect(deliveryRadioButton.nativeElement.checked).toBeFalse;
    await deliveryRadioButton.triggerEventHandler('click', null);
    expect(deliveryRadioButton.nativeElement.checked).toBeTrue;

    expect(component.isDelivery).toBeTrue;
  });
});
