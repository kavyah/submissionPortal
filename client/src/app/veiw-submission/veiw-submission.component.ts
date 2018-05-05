import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { SubmissionService } from '../Services/submission.service';

@Component({
    selector: 'app-veiw-submission',
    templateUrl: './veiw-submission.component.html',
    styleUrls: ['./veiw-submission.component.css']
})
export class VeiwSubmissionComponent implements OnInit {
    submissions;
    constructor(public authService: AuthService, private submissionService: SubmissionService) {

        this.getAllSubmissions();
    }
    getAllSubmissions() {

        this.submissionService.getAllSubmissions().subscribe(data => {
            this.submissions = data.submissions;
        });
    }
    ngOnInit() {



        this.getAllSubmissions();
    }
}
