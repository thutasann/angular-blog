import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/types';

export interface File{
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  form: FormGroup;

  file: File = {
    data: null,
    progress: 0,
    inProgress: false
  } 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true}, [Validators.required]],
      name: [ null, [Validators.required]],
      username: [ null, [Validators.required]],
      profileImage: [null]
    });

    // getting user info
    this.authService.getUserId().pipe(
      switchMap((id: number) => this.userService.findOne(id).pipe(
        tap((user: User) => {
          this.form.patchValue({
            id: user.id,
            name: user.name,
            username: user.username,
            profileImage: user.profileImage
          });
          console.log("FOMR =>", this.form);
        })  
      ))
    ).subscribe();
  }

  /**
   * File upload click
   */
  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }

  /**
   * Upload file
   */
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.userService.uploadProfileImage(formData).pipe(
      tap((e) => console.log(e)),
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if(typeof (event) === 'object') {
          this.form.patchValue({profileImage: event.body.profileImage});
        }
      })
  }



  /**
   * Update profile
   */
  update(){
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }

}
