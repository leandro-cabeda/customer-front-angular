import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  onDeleteCustomer(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          this.getCustomers();
          console.log('Cliente excluído com sucesso');
        },
        (error) => {
          console.error('Erro ao excluir cliente:', error);
        }
      );
    }
  }
}
