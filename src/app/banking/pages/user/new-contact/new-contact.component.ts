import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {
  private fb = inject(FormBuilder);

  public myFormTransaction: FormGroup = this.fb.group({
    selectedValue:['']

  });
}
