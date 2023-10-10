import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.scss']
})
export class DiaryPageComponent implements OnInit {

  constructor() { }
  pickedSegment: string = 'tasks'

  ngOnInit(): void {
  }

  segmentChanged(event: any) {
    this.pickedSegment = event.detail.value
  }
}
