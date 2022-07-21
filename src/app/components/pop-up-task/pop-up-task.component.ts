import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimelistService } from 'src/app/services/timelist.service';
import { timeInterface, timeSlotInterface, keywordTypes } from 'src/app/timeinterface';
import { Subscription } from 'rxjs';
import { TimeSpaceComponent } from '../time-space/time-space.component';

@Component({
  selector: 'app-pop-up-task',
  templateUrl: './pop-up-task.component.html',
  styleUrls: ['./pop-up-task.component.css']
})
export class PopUpTaskComponent implements OnInit {
  id?: number;
  parentId!: number;
  time!: string;
  reminder!: boolean;
  topic!: string;
  description!: string;
  listCheck!: boolean;
  listItem!: string;
  start!: boolean
  //Send signal to trigger a function to parent html
  // @Output() onSaveNewTask = new EventEmitter
  subscription!: Subscription;
  timeSpace!: TimeSpaceComponent

  constructor(@Inject(MAT_DIALOG_DATA) public editRow: timeSlotInterface, private timeList: TimelistService, private dialogRef: MatDialogRef<PopUpTaskComponent>) { }

  ngOnInit(): void {
    // if (this.editRow) {

    //   this.id = this.editRow.id,
    //     this.parentId = this.editRow.parentId,
    //     this.time = this.editRow.time,
    //     this.reminder = this.editRow.reminder,
    //     this.topic = this.editRow.topic,
    //     this.description = this.editRow.description,
    //     this.listCheck = this.editRow.listCheck,
    //     this.listItem = this.editRow.listItem,
    //     this.start = this.editRow.start
    // }
    // else {
    //   let addOn = this.timeList.getItemAddOn()
    // }
  }

  returnDialogData(data: boolean) {

    this.dialogRef.close(data)

    // if (this.topic) {
    //   const newItem = {
    //     topic: this.topic,
    //     description: this.description,
    //     listItem: this.listItem,
    //   }

    //   return newItem
    // }

    // else if (this.editRow) {
    //   this.onSubmit()
    // }
    // return

  }

  // //Not Used anymore
  // onSubmit() {
  //   //If "Add Task" button is clicked
  //   if (!this.editRow) {
  //     console.log("not")
  //     //Check if "topic" is filled
  //     if (!this.topic) {
  //       alert("Where's da topic?")
  //       return
  //     }
  //     const newItem = {
  //       topic: this.topic,
  //       description: this.description,
  //       listItem: this.listItem,
  //     }
  //     // this.timeSpace.mergeProperties(newItem)
  //     // this.timeList.getItemAddOn().subscribe((value) => (console.log("yoyoyo"), console.log(value), this.mergeProperties(newItem, value)))
  //     // this.onSaveNewTask.emit(newItem)
  //     // this.timeList.toggleAdd(newItem)
  //     console.log("clearing")
  //     this.topic = '';
  //     this.description = '';
  //     this.listItem = ''

  //   }
  //   //If "Edit" button is clicked
  //   else if (this.editRow) {
  //     console.log("yes")
  //     const newRow: timeSlotInterface = {
  //       id: this.id,
  //       parentId: this.parentId,
  //       time: this.time,
  //       reminder: this.reminder,
  //       topic: this.topic,
  //       description: this.description,
  //       listCheck: this.listCheck,
  //       listItem: this.listItem,
  //       start: this.start
  //     }

  //     console.log(newRow)
  //     this.updateRow(newRow)
  //     // this.timeList.getTime(keywordTypes.timeslotsItem).subscribe((value) => (this.timeList.toggleRefresh(value), console.log("toggling"), console.log(value)))

  //   }

  // }

  // //Not used anymore
  // updateRow(newRow: timeSlotInterface) {
  //   this.timeList.updateTime(newRow).subscribe((updatedRow) => { console.log(updatedRow), this.editRow = updatedRow; this.getTimeAndToggleRefresh() })
  //   // this.timeList.getTime(keywordTypes.timeslotsItem).subscribe((value) => (console.log("check updateRow"), console.log(value)))

  // }

  // //Not used anymore
  // getTimeAndToggleRefresh() {
  //   this.timeList.getTime(keywordTypes.timeslotsItem).subscribe((value) => (this.timeList.toggleRefresh(value), console.log("toggling"), console.log(value)))
  // }

  // addItems(newItem: any) {
  //   this.timeList.toggleAdd(newItem)
  // }

  // //Not used anymore
  // mergeProperties(itemAddOn: any, value: any) {
  //   var newItem: any = {};
  //   for (var attrname in itemAddOn) { newItem[attrname] = itemAddOn[attrname]; }
  //   for (var attrname in value) { newItem[attrname] = value[attrname]; }
  //   console.log(newItem)
  //   // this.timeSpace.updateTimeSpace(newItem)
  //   // this.timeList.addTime(newItem).subscribe((value) => this.timeList.toggleAdd(newItem))

  // }

  // //Not used anymore
  // editMode(value: boolean) {
  //   this.timeList.toggleEdit(value)
  // }


}








