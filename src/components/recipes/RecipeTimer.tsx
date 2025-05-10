
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Pause, Play, RotateCcw, Bell } from "lucide-react";
import { toast } from "sonner";

interface TimerProps {
  minutes: number;
  stepDescription: string;
}

export function RecipeTimer({ minutes, stepDescription }: TimerProps) {
  const initialSeconds = minutes * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
      setIsComplete(true);
      
      // Play sound if available
      try {
        const audio = new Audio("/notification.mp3");
        audio.play().catch(e => console.log('Audio not available'));
      } catch (e) {
        console.log('Audio not available');
      }
      
      // Show notification
      toast("Timer Complete!", {
        description: `${stepDescription} is ready!`,
        icon: <Bell className="h-4 w-4" />,
      });
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, stepDescription]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeRemaining(initialSeconds);
    setIsRunning(false);
    setIsComplete(false);
  };

  const progressPercentage = ((initialSeconds - timeRemaining) / initialSeconds) * 100;

  return (
    <div className={`p-4 border rounded-md animate-fade-in ${isComplete ? 'bg-green-50 border-green-200' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          <span>Timer: {minutes} min</span>
        </div>
        <div className="text-xl font-mono font-bold">
          {formatTime(timeRemaining)}
        </div>
      </div>

      <Progress
        value={progressPercentage}
        className={`h-2 ${isComplete ? 'bg-green-100' : 'bg-muted'}`}
        indicatorClassName={isComplete ? 'bg-green-500' : (isRunning ? 'bg-recipe-primary' : 'bg-muted-foreground')}
      />
      
      <p className="text-sm mt-2 text-muted-foreground">
        {stepDescription}
      </p>

      <div className="flex gap-2 mt-4">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            variant={isComplete ? "outline" : "default"}
            className={`flex items-center gap-2 ${isComplete ? 'border-green-500 text-green-500 hover:bg-green-50' : ''}`}
            disabled={isComplete}
          >
            <Play className="h-4 w-4" />
            {isComplete ? "Complete" : "Start"}
          </Button>
        ) : (
          <Button onClick={handlePause} variant="outline" className="flex items-center gap-2">
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        )}
        <Button onClick={handleReset} variant="ghost" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default RecipeTimer;
