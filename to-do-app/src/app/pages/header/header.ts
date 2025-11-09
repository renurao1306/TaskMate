import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() showSidebar = new EventEmitter<boolean>();
  showSidebarFlag: boolean = false;

  toggleSidebar(){
    this.showSidebarFlag = !this.showSidebarFlag;
    this.showSidebar.emit(this.showSidebarFlag);
  }

  showProfile(){
    console.log('Show Profile...')
  }
}
