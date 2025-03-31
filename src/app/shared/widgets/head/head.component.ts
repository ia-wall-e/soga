import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  standalone: false
})
export class HeadComponent implements OnInit {
  title = input<string>();
  subtitle = input<string>();
  heading = input<string>();
  fontsize?: string;
  constructor() { }

  ngOnInit() {
    if (this.heading() == '1') this.fontsize = "heading-1";
    if (this.heading() == '3') this.fontsize = "heading-3";
  }

}
