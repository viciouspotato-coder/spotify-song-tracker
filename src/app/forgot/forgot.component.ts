import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  registerUser: RegisterUser = { userName: "", password: "", password2: "" };
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if (this.registerUser.userName != '' && this.registerUser.password != '' && this.registerUser.password2 != '') {
      this.loading = true;
      this.authService.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      )
    }
  }
}
