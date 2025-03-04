import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { HomeService } from './home.service';
import { TokenStorageService } from '../Services/token-storage.service';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
interface Item {
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule,HeaderMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private tokenStorage:TokenStorageService,private homeService:HomeService) {
    
  }
  ecommerceGroup=new FormGroup({
    search: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    items:new FormArray([])
  });
  ngOnInit(): void {
    // debugger;
    console.log(this.tokenStorage.getToken());
    this.homeService.getJwtData().subscribe((data:any) => {

      console.log(data);
    });
    this.itemss.map(item => {
      this.getItemData().push(new FormGroup({
        name: new FormControl(item.name),
        category: new FormControl(item.category),
        price: new FormControl(item.price)
      }));
    });
   console.log(this.ecommerceGroup.get('items')?.value);
  }
  getItemData(): FormArray {
    return this.ecommerceGroup.get('items') as FormArray;
  }
  itemss: Item[] = [
    { name: 'Item 1', category: 'Electronics', price: 100 },
    { name: 'Item 2', category: 'Clothing', price: 50 },
    { name: 'Item 3', category: 'Electronics', price: 200 },
    { name: 'Item 4', category: 'Books', price: 30 },
    { name: 'Item 5', category: 'Clothing', price: 80 }
  ];

  // filteredItems: Item[] = [...this.items];
  // selectedCategory: string = '';
  // maxPrice: number = 0;
  
  // filterItems() {
  //   this.filteredItems = this.items.filter(item => {
  //     return (this.selectedCategory ? item.category === this.selectedCategory : true) &&
  //            (this.maxPrice ? item.price <= this.maxPrice : true);
  //   });
  // }
  getLogin(){
    console.log(this.tokenStorage.getToken());
    this.homeService.getLogin().subscribe((data:any) => {
      console.log(data);
    });
  }
}
