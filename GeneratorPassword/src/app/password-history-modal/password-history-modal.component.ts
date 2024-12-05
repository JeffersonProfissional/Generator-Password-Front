import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-password-history-modal',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './password-history-modal.component.html',
  styleUrl: './password-history-modal.component.css',
  providers: [DatePipe] 
})
export class PasswordHistoryModalComponent implements OnInit {


  @Output() closeModal = new EventEmitter<void>();

  passwordHistory: { password: string; date: string }[] = [];

  constructor(private passwordService: PasswordService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.passwordService.getPasswordHistory().subscribe({
      next: (data) => {
        // Formate as datas
        this.passwordHistory = data.map(item => ({
          password: item.password,
          // Formate a data para o padrão brasileiro
          date: this.datePipe.transform(item.dateTime, 'dd/MM/yyyy HH:mm:ss') || ''
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar histórico de senhas:', err);
      }
    });
  }

  onClose() {
    this.closeModal.emit();
  }
}
