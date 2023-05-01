import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'transformDate'
})
export class DatePipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        var slicedDate:string = value.slice(2,-8);
        return slicedDate.replace("T"," ");
        
    }
}