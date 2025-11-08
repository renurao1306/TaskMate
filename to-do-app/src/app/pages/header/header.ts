import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
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
}
