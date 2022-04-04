import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services/user/user.service';
import { User } from 'api/collection/user/user.interface';

@Component({
  selector: 'app-find-all',
  templateUrl: './find-all.component.html',
  styleUrls: ['./find-all.component.scss']
})
export class FindAllComponent implements OnInit {

  public users: User[] = []

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.find().subscribe({
      error: () => alert('Error on fetching data!'),
      next: (res) => this.users = res
    })
  }

}
