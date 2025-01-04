import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { HomeComponentService } from './home-component.service';
interface Item {
  name: string;
  category: string;
  price: number;
}
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private homecompService:HomeComponentService) {
    
  }
  ngOnInit(): void {
    debugger;
    this.homecompService.getLogin().subscribe((data) => {
      console.log(data);
    });
  }
  items: Item[] = [
    { name: 'Item 1', category: 'Electronics', price: 100 },
    { name: 'Item 2', category: 'Clothing', price: 50 },
    { name: 'Item 3', category: 'Electronics', price: 200 },
    { name: 'Item 4', category: 'Books', price: 30 },
    { name: 'Item 5', category: 'Clothing', price: 80 }
  ];

  filteredItems: Item[] = [...this.items];
  selectedCategory: string = '';
  maxPrice: number = 0;
  
  filterItems() {
    this.filteredItems = this.items.filter(item => {
      return (this.selectedCategory ? item.category === this.selectedCategory : true) &&
             (this.maxPrice ? item.price <= this.maxPrice : true);
    });
  }
}
