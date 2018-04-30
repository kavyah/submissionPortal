import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { SubmissionService } from '../Services/submission.service';


@Component({
    selector: 'app-submission',
    moduleId: module.id.toString(),
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

    messageClass;
    message;
    email;
    form;
    submissions;
    constructor(private formBuilder: FormBuilder,
        public authService: AuthService, private submissionService: SubmissionService
) {

        this.onCreateSubmission();
    }

     onCreateSubmission() {
        this.form = this.formBuilder.group({
            link: ['', Validators.compose([
                Validators.required
                       ])],
            references: [''],
            comments: [''],
        })
    }
    
     onSubmit() {
         const submission = {
            link: this.form.get('link').value, // Title field
             references: this.form.get('references').value, // Body field
             comments: this.form.get('comments').value, // Body field
             createdBy: this.email 

         }
         this.submissionService.newSubmission(submission).subscribe(data => {

             if (!data.success) {
                 this.messageClass = 'alert alert-danger'; // Return error class
                 this.message = data.message; // Return error message
                 this.getAllSubmissions();                 
             } else {
                 this.messageClass = 'alert alert-success'; // Return success class
                 this.message = data.message; // Return success message
                 // Clear form data after two seconds
                 setTimeout(() => {
                     this.form.reset(); // Reset all form fields
                 }, 2000);
             }
         }); 
     } 

     getAllSubmissions() {
        
         this.submissionService.getAllSubmissions().subscribe(data => {
             this.submissions = data.submissions; // Assign array to use in HTML
         });
     }
  

    ngOnInit() {
        
        this.authService.getProfile().subscribe(profile => {
            this.email = profile.user.email; 
        });
    }
   
}
