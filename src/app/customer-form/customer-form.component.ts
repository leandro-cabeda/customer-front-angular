import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    nome: '',
    email: '',
    status: 'ativo',
    tipoPessoa: 'junior'
  };
  isEditMode = false;
  id: number | null = null;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    // Se o ID for válido, entra no modo de edição
    if (this.id) {
      this.isEditMode = true;
      this.customerService.getCustomer(this.id).subscribe(
        (data: Customer) => {
          this.customer = data;
        },
        (error) => {
          console.error('Erro ao buscar cliente:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.id!, this.customer).subscribe(
        () => {
          console.log('Cliente atualizado com sucesso');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
        }
      );
    } else {
      this.customerService.createCustomer(this.customer).subscribe(
        (data: Customer) => {
          console.log('Cliente criado com sucesso:', data);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao criar cliente:', error);
        }
      );
    }
  }
}
