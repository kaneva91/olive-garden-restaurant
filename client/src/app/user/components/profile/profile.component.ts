import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  get currentUser() {
    return this.userService.userInfo;
  }

  private profileForm: FormGroup;
  private hasChanged = false;

  get canEdit() {
    return !(this.hasChanged && this.profileForm.valid)
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToastrService
    ) {
    this.profileForm = fb.group({
      firstName: [this.currentUser.firstName, [Validators.required]],
      lastName: [this.currentUser.lastName, [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.pattern(new RegExp('^([A-Za-z0-9._]{4,})@([a-z0-9]{2,})\.(com|bg)$'))]]
    })
  }

  ngOnInit() {
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.profileForm.valueChanges.subscribe(() => {
      this.hasChanged = true;
    })
  }

  editProfileHandler(data) {
    this.userService.editProfile(data).subscribe(res => {
      this.userService.updateUser = res;
      this.toasterService.success('Profile edited successfully!')
     // alert('Profile edited successfully!')
    })
  }

  logoutHandler() {
    this.userService.loguot().subscribe(() => {
      this.router.navigate(['']);
     this.toasterService.success('Logout successfully!')
      //alert('Logout successfully!')
    })
  }

  deleteProfileHandler() {
    const userId = this.userService.userInfo.id
    this.userService.delteProfile(userId).subscribe(() =>
  {  this.toasterService.success('Profile deleted!')
 // alert('Profile deleted!')
      this.router.navigate([''])}
    )
  }
}
