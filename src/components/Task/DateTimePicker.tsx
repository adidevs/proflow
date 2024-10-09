"use client";

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dateFormatter } from "@/utils/dateFormatter";
import { format } from "date-fns";

// Utility function to extract time components
function extractTimeFromDate(date: Date | undefined) {
  if (!date) return ["10", "00", "PM"];
  const [time, ampm] = format(date, "hh:mm a").split(" ");
  const [hours, minutes] = time.split(":");
  return [hours, minutes, ampm];
}

// Utility function to combine date and time
function combineDateAndTime(
  selectedDate: Date | undefined,
  selectedTime: string
) {
  if (!selectedDate) return null;

  const [timeString, period] = selectedTime.split(" ");
  const [hours, minutes] = timeString.split(":").map(Number);
  const adjustedHours =
    period === "PM" && hours !== 12
      ? hours + 12
      : period === "AM" && hours === 12
      ? 0
      : hours;

  const combinedDateTime = new Date(selectedDate);
  combinedDateTime.setHours(adjustedHours, minutes, 0, 0);

  return combinedDateTime;
}

// TimePicker Component
function TimePicker({
  setTime,
  hour,
  setHour,
  minute,
  setMinute,
  am_pm,
  setAmPm,
}: {
  setTime: React.Dispatch<React.SetStateAction<string>>;
  hour: string;
  setHour: React.Dispatch<React.SetStateAction<string>>;
  minute: string;
  setMinute: React.Dispatch<React.SetStateAction<string>>;
  am_pm: string;
  setAmPm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i.toString()));
  const ampm = ["AM", "PM"];

  // Update time state when hour, minute, or am_pm changes
  useEffect(() => {
    setTime(`${hour}:${minute} ${am_pm}`);
  }, [hour, minute, am_pm, setTime]);

  return (
    <div className="flex flex-row gap-1 items-center justify-center mt-1">
      <Select value={hour} onValueChange={setHour}>
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder={hour} />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={minute} onValueChange={setMinute}>
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder={minute} />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={am_pm} onValueChange={setAmPm}>
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder={am_pm} />
        </SelectTrigger>
        <SelectContent>
          {ampm.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// DateTimePicker Component
function DateTimePicker({
  deadline,
  setEditedTask,
}: {
  deadline: Date | undefined;
  setEditedTask: React.Dispatch<React.SetStateAction<any>>;
}) {
  const initialDeadlineTime = extractTimeFromDate(deadline);
  const [date, setDate] = useState<Date | undefined>(deadline);
  const [time, setTime] = useState<string>(
    `${initialDeadlineTime[0]}:${initialDeadlineTime[1]} ${initialDeadlineTime[2]}`
  );
  const [newDeadline, setNewDeadline] = useState<Date | undefined | null>(deadline);
  const [hour, setHour] = useState<string>(initialDeadlineTime[0]);
  const [minute, setMinute] = useState<string>(initialDeadlineTime[1]);
  const [am_pm, setAmPm] = useState<string>(initialDeadlineTime[2]);

  useEffect(() => {
    // Combine date and time into a new deadline
    const newCombinedDeadline = combineDateAndTime(date, time);
    
    // Update the state with the new deadline
    setNewDeadline(newCombinedDeadline);
    // If the new deadline exists, update the task's deadline
    if (newCombinedDeadline) {
      setEditedTask((prevTask: any) => ({
        ...prevTask,
        deadline: newCombinedDeadline,
      }));
    }
  }, [date, time]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " text-xs justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {newDeadline ? dateFormatter(newDeadline) : <span>Pick a date & Time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col items-center justify-center">
        <TimePicker
          setTime={setTime}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          am_pm={am_pm}
          setAmPm={setAmPm}
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateTimePicker;
