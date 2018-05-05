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
    linkValid;
    linkMessage;
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
                //this.validateLink
            ])],
            references: [''],
            comments: [''],
        })
    }
    
     onSubmit() {
         const submission = {
            link: this.form.get('link').value, 
            references: this.form.get('references').value,
            comments: this.form.get('comments').value, 
             createdBy: this.email 

         }
         this.submissionService.newSubmission(submission).subscribe(data => {

             if (!data.success) {
                 this.messageClass = 'alert alert-danger'; 
                 this.message = data.message;                 
             } else {
                 this.messageClass = 'alert alert-success'; 
                 this.message = data.message; 

                  setTimeout(() => {
                     this.form.reset(); 
                 }, 2000);
             }
         }); 
     } 

     
    /* validateLink(controls) {
         // Create a regular expression
         const regExp = new RegExp('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/');
         // Test email against regular expression
         if (regExp.test(controls.value)) {
             return null; // Return as valid email
         } else {
             return { 'validateLink': true } // Return as invalid email
         }
     }*/
     checkLink() {
         
         this.authService.checkLink(this.form.get('link').value).subscribe(data => {
                      if (!data.success) {
                 this.linkValid = false;
                 this.linkMessage = data.message; 
             } else {
                          this.linkValid = true;
                          this.linkMessage = data.message;
             }
         });
     }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.email = profile.user.email; 
        });
    }
   
}
