import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ProductsService } from '../products/services/products.service';

import { CheckoutComponent } from './checkout.component';

import {
  MatRadioButtonHarness,
  MatRadioGroupHarness,
} from '@angular/material/radio/testing';

let loader: HarnessLoader;

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [ProductsService, ShoppingCartService, DataService],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('select between pickup and delivery should work', async () => {
    const formLoader = await (await loader.getChildLoader('.container')).getChildLoader('.form');
    const radioGroupDelivery = await formLoader.getHarness<MatRadioGroupHarness>(
      MatRadioGroupHarness
    );

    expect(component.isDelivery).toBeTrue;
    expect((await radioGroupDelivery.getRadioButtons()).length).toBe(2);
    
    const groupLoader = await formLoader.getChildLoader('mat-radio-group');
    const radioButtonsDelivery = await groupLoader.getAllHarnesses<MatRadioButtonHarness>(
      MatRadioButtonHarness
    );

    let pickupRadioButton = radioButtonsDelivery[0];
    
    expect(await pickupRadioButton.isChecked()).toBeFalse();
    // await pickupRadioButton.check();
    // expect(name).toBe('pickup');
    // name = await radioButtonsDelivery[1].getValue()
    // expect(name).toBe('delivery');
    // await radioButtonsDelivery[0].check();
    // expect(component.isDelivery).toBeFalse;
  });
});
