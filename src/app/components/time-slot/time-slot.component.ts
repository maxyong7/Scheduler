import { Component, Inject, Input, OnInit } from '@angular/core';
import { PopUpTaskComponent } from '../pop-up-task/pop-up-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TimelistService } from 'src/app/services/timelist.service';
import { timeInterface, timeSlotInterface, keywordTypes } from 'src/app/timeinterface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {
  timeList: timeInterface[] = [];
  // timeList: any = [];
  timeSlotList: any[] = [];
  refreshedTimeList!: timeInterface
  subscription!: Subscription
  localtimeSlotList: any[] = [];

  constructor(public dialog: MatDialog,
    private timeService: TimelistService,
  ) {
    //if Submit is clicked, then it will get a new TimeList again
    // this.subscription = this.timeService.OnRefresh().subscribe(() => this.timeService.getTime(keywordTypes.timeslots).subscribe((timeList) => (this.timeList = timeList)))
    // this.subscription = this.timeService.OnRefresh().subscribe((timeSlotList) => (this.timeSlotList = timeSlotList, console.log("refreshed"), console.log(timeSlotList), console.log(this.timeSlotList)))
    // console.log("ww")
    // console.log(this.subscription)
    // this.subscription = this.timeService.OnRefresh().subscribe(value => this.refreshTimeslotsItem())

  }

  ngOnInit(): void {
    this.timeService.getTime(keywordTypes.timeslots).subscribe((timeList) => (this.timeList = timeList, localStorage.setItem("localTimeList", JSON.stringify(timeList))));
    this.timeService.getTime(keywordTypes.timeslotsItem).subscribe((timeSlotList) => { (this.timeSlotList = timeSlotList, localStorage.setItem("localTimeSlotList", JSON.stringify(timeSlotList))), this.timeService.toggleRefresh() })
  }

  deleteTimeSlot(value: any) {
    // console.log("value")
    // console.log(value)
    // this.timeService.deleteTime(value).subscribe(() => (this.timeSlotList = this.timeSlotList.filter((t) => t.id !== value.id)))
    this.timeService.deleteTime(value).subscribe()
  }

  submitAddTime(): any {
    const itemAddOn = {
      // parentId: ,
      // time: this.f.time,
      reminder: false,
      listCheck: false,
      start: false
    }
    return itemAddOn
  }



  // mergeProperties(itemAddOn: any, value: any) {
  //   var newItem: any = {};
  //   for (var attrname in itemAddOn) { newItem[attrname] = itemAddOn[attrname]; }
  //   for (var attrname in value) { newItem[attrname] = value[attrname]; }
  //   console.log(newItem)
  //   this.timeService.addTime(newItem).subscribe((value) => this.timeSlotList.push(value))

  // }
  // refreshTimeslotsItem(): void {
  //   this.timeService.getTime(keywordTypes.timeslots).subscribe((timeList) => (this.timeList = timeList));
  // }

  // addTask() {
  //   const dialogRef = this.dialog.open(PopUpTaskComponent)
  // }

  // onEdit(timeRow: any) {
  //   const dialogRef = this.dialog.open(PopUpTaskComponent, { data: timeRow })
  // }

  // updateTimeSpace(timeRowUpdate: any) {
  //   console.log("check")
  // }


}
