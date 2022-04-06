import { Component, Input, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() text_color: String;
  @Input() div_color: String;
  constructor() { }

  ngOnInit(): void {
  }

}
