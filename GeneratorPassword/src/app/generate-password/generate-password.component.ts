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
    const selectedCharTypes: { [key: string]: boolean } = {
      uppercase: this.includeUppercase,
      lowercase: this.includeLowercase,
      numbers: this.includeNumbers,
      specialChars: this.includeSpecialChars,
    };
  
    const charSets: { [key: string]: string } = {
      uppercase: this.uppercaseChars,
      lowercase: this.lowercaseChars,
      numbers: this.numberChars,
      specialChars: this.specialChars,
    };
  
    let characters = '';
    let password = '';
  
    Object.keys(selectedCharTypes).forEach((type) => {
      if (selectedCharTypes[type]) {
        const charSet = charSets[type];
        characters += charSet;
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
    });
  
    if (!characters) {
      alert('Por favor, selecione ao menos uma opção de tipo de caractere.');
      return;
    }
  
    while (password.length < this.passwordLength) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
    this.generatedPassword = this.shuffleString(password);
  
    this.passwordService.sendPassword(this.generatedPassword).subscribe({
      error: (error) => console.error('Erro ao enviar senha:', error),
      complete: () => console.log('Requisição concluída.'),
    });
  }
  

  private shuffleString(str: string): string {
    let array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      console.log(array);
    }
    return array.join('');
  }

  openPasswordHistoryModal() {
    this.isModalOpen = true;
  }
}
