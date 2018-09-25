import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <div class="introduce">
      Hello，大家好！我叫<span>{{name}}</span>，我今年<span>{{age}}</span>岁了。
    </div>
  `,
  styles: [`
    span{
      color:red
    }
    .introduce{
      padding:15px; 20px;
      margin-bottom:20px;
      border-radius:3px;
      border:1px solid #E6E6E6;
      color:#444;
      font-size:16px;
    }
  `]
})
export class HelloComponent implements OnInit {

  @Input() name: string;
  @Input() age: number;
  constructor() { }

  ngOnInit() {

  }
}
