import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordService } from '../password.service';
import { PasswordHistoryModalComponent } from '../password-history-modal/password-history-modal.component';

@Component({
  selector: 'app-generate-password',
  standalone: true, 
  imports: [CommonModule, FormsModule, PasswordHistoryModalComponent], 
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent {
  isModalOpen: boolean = false;
  passwordLength: number = 6;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;
  generatedPassword!: string;

  private uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
  private numberChars: string = '0123456789';
  private specialChars: string = '!@#$%^&*()-_=+[{]}|;:,.<>?';

  constructor(private passwordService: PasswordService) { }

  generatePassword(): void {
    if (!this.includeLowercase && !this.includeNumbers && !this.includeSpecialChars && !this.includeUppercase) {
      alert('Por favor, selecione ao menos uma opção de tipo de caractere.');
      return;
    }

    const requestBody = {
      length: this.passwordLength,
      upperCase: this.includeUppercase,
      lowerCase: this.includeLowercase,
      numbers: this.includeNumbers,
      specialChars: this.includeSpecialChars
    };

    this.passwordService.sendPassword(requestBody).subscribe({
      next: (response) => {
        this.generatedPassword = response.password;
        console.log('Senha gerada com sucesso:', this.generatedPassword);
      },
      error: (error) => {
        alert('Erro ao gerar senha');
        console.error('Erro ao gerar senha:', error);
      },
      complete: () => {
        console.log('Requisição concluída.');
      }
    });
  }

  openPasswordHistoryModal() {
    this.isModalOpen = true;
  }
}
