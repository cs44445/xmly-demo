import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/services/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  user: User = { name: 'jojo', phone: '', password: '' }
  // user: User = { name: '', phone: '', password: '' }
  constructor() { }

  ngOnInit(): void {
  }

}
