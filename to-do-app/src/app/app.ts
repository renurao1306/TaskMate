import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';
import { Header } from './pages/header/header';
import { Sidebar } from './pages/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Sidebar, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showSidebarFlag: boolean = false;

  toggleSidebar(show: boolean) {
    this.showSidebarFlag = show;
  }







  hello() {
    const myConstant = 7;
    let myLet = 1;
    var myVar = 10;
    // console.log(myVar);

    if (true) {
      let myLet = 2;
      var myVar = 20;
    }
    console.log(myConstant, myLet, myVar)
  }
}
