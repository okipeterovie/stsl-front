import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  errorMessage: string = '';
  displayReport: boolean = false;
  dataFromBack: any;
  listOfPosition: any[] = [];
  localListOfPosition: any[] = [];
  tablePage: number = 1;
  tablePageSize: number = 100;
  selectedHistory: any;

  constructor(private router: Router) {
    this.patchFields();

  }

  ngOnInit(): void {
  }

  patchFields(): void {

    if (localStorage.getItem('selectedHistory') != null) {
      this.displayReport = true;
      // console.log(response.data)
      this.dataFromBack = JSON.parse(localStorage.getItem('selectedHistory') || '{}')[0];
      if (this.dataFromBack.check == "YES") {
        this.listOfPosition = this.dataFromBack.patternDtos;
        this.localListOfPosition = this.listOfPosition;
      }
    } else {
      alert('Something is wrong');
      this.router.navigate(['/kangaroo-cheorographer/']);
    }
  }

  newCheorograph(): void {
    this.router.navigate(['/kangaroo-cheorographer/new/']);
  }

  goBack(): void {
    window.history.go(-1);
  }

}
