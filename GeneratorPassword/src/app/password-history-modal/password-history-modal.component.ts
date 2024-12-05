import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-password-history-modal',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './password-history-modal.component.html',
  styleUrl: './password-history-modal.component.css'
})
export class PasswordHistoryModalComponent implements OnInit {
  private mockPasswordHistory = [
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
    { password: 'Senha123!', date: '2024-12-01T10:30:00' },
    { password: 'Password2024@', date: '2024-12-02T14:45:00' },
    { password: 'Secure#Pass1', date: '2024-12-03T09:15:00' },
  ];

  @Output() closeModal = new EventEmitter<void>();

  passwordHistory: { password: string; date: string }[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
    /*this.passwordService.getPasswordHistory().subscribe({
      next: (data) => {
        this.passwordHistory = data;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico de senhas:', err);
      },
    });*/
    this.passwordHistory = this.mockPasswordHistory;
  }

  onClose() {
    this.closeModal.emit();
  }
}
