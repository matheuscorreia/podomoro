// formats a value in seconds to HH:mm format
export function formatTimer(s){
  let minutes = Math.floor(s / 60);
  let seconds = s % 60;

  return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

//  Checks if a value is between 2 values
export function inBetween(val, min, max, includeExtremes){
  includeExtremes = includeExtremes || false;

  if(!includeExtremes){
    return val > min && val < max;
  }else{
    return val >= min && val <= max;
  }
}

//  Sets timer with option for callback every second until seconds run out
//  and another callback that is called when timer finishes. The return of
//  this last callback can return a number of seconds so the timer can
//  restart.
export function setTimer(seconds, cbInterval, cbFinished){
  let s = seconds;

  var interval = setInterval(function () {
    if(s > 0){
      s--;
      cbInterval();
    }else{
      s = cbFinished();
    }
  }, 1000);

  return interval;
}
