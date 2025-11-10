import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() showSidebar = new EventEmitter<boolean>();
  showSidebarFlag: boolean = false;

  constructor(private router: Router){}

  toggleSidebar(){
    this.showSidebarFlag = !this.showSidebarFlag;
    this.showSidebar.emit(this.showSidebarFlag);
  }

  logout(){
    console.log('Logging Out...')
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
