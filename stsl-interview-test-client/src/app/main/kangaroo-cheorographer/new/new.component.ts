import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/layouts/bootstrap/toast/ToastService';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  errorMessage: string = '';
  kangarooForm!: FormGroup;
  loading: boolean = false;
  displayReport: boolean = false;
  dataFromBack: any;
  listOfPosition: any[] = [];
  localListOfPosition: any[] = [];
  tablePage: number = 1;
  tablePageSize: number = 100;
  history: any[] = [];

  constructor(private apiServices: ApiService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,) {

    this.kangarooForm = this.initializeForm();

  }

  ngOnInit(): void {
  }

  initializeForm() {
    return this.kangarooForm = this.formBuilder.group({
      position1: ['', Validators.required],
      velocity1: ['', Validators.required],
      position2: ['', Validators.required],
      velocity2: ['', Validators.required]
    });
  }

  get kangarooFormControl() {
    return this.kangarooForm.controls;
  }

  doSubmit(): void {

    if (this.kangarooForm.valid) {
      this.loading = true;

      let request: any = {
        position1: this.kangarooFormControl.position1.value,
        velocity1: this.kangarooFormControl.velocity1.value,
        position2: this.kangarooFormControl.position2.value,
        velocity2: this.kangarooFormControl.velocity2.value
      }

      this.apiServices.post_("/default", request)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((response: any) => {
          if (response.success == true && response.status == "OK") {
            this.displayReport = true;
            // console.log(response.data)
            this.dataFromBack = response.data;
            if (this.dataFromBack.check == "YES") {
              this.listOfPosition = this.dataFromBack.patternDtos;
              this.localListOfPosition = this.listOfPosition;
            }

            if (localStorage.getItem('history') != null) {
              this.history = JSON.parse(localStorage.getItem('history') || '{}');
              // data = JSON.parse(data);
            }

            if (this.history.length == 0) {
              this.dataFromBack['position'] = 1;
              this.history.push(this.dataFromBack);
              localStorage.setItem('history', JSON.stringify(this.history));
            }
            else if (this.history.length > 0 && this.history.length < 10) {
              let lastElement = this.history[this.history.length - 1];
              this.dataFromBack['position'] = lastElement.position + 1;
              this.history.push(this.dataFromBack);
              localStorage.setItem('history', JSON.stringify(this.history));
            }
            else if (this.history.length >= 10) {
              let lastElement = this.history[this.history.length - 1];
              this.dataFromBack['position'] = lastElement.position + 1;
              this.history.shift();
              this.history.push(this.dataFromBack);
              localStorage.setItem('history', JSON.stringify(this.history));
            }


          }
          else {
            // this.alertService.alertSuccess(response.message);
            this.toastService.showDanger(response.message);
          }
        }, (error) => {
          console.log(error);
          this.toastService.showDanger(error);
        })

    }

  }

  goBack(): void {
    window.history.go(-1);
  }


}
