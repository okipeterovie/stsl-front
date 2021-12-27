import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  localHistory: any[] = [];
  history: any[] = [];
  tablePage: number = 1;
  tablePageSize: number = 100;

  constructor(private router: Router) {

    if (localStorage.getItem('history') != null) {
      this.history = JSON.parse(localStorage.getItem('history') || '{}');
      this.localHistory = this.history;
      // data = JSON.parse(data);
    }
  }

  ngOnInit(): void {
  }

  viewHistory(id: number) {

    let selectedHistory = this.history.filter((e) => {
      return e.position == id
    });

    localStorage.setItem('selectedHistory', JSON.stringify(selectedHistory));

    this.router.navigate(['/kangaroo-cheorographer/view-history/']);

  }

  newCheorograph(): void {
    this.router.navigate(['/kangaroo-cheorographer/new/']);
  }



}
