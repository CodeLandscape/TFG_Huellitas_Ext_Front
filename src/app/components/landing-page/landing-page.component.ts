import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  scrollToContent(): void {
    const contentElement = this.elementRef.nativeElement.querySelector('#content');
    contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
