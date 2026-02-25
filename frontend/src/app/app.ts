import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Banner } from './components/banner/banner';
import { AnnonceCards } from './components/annonce-cards/annonce-cards';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Banner, AnnonceCards],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
