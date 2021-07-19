video = ""
status = ""
objects = []
function preload(){
video = createVideo("video.mp4")
video.hide()
}
function setup(){
canvas = createCanvas(480, 380)
canvas.center()
}
function draw(){
image(video, 0, 0, 480, 380)
if(status != ""){
    objectDetector.detect(video, gotResults)    
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects detected. Showing in a red box."
        document.getElementById("objects_detected").innerHTML = "Number of Objects Detected: " + objects.length; 
        console.log(i)
        fill('#80000D')
        percentage = floor(objects[i].confidence * 100)
        console.log(percentage);
        text(objects[i].label + " " + percentage + "%",objects[i].x + 20, objects[i].y + 20)
        noFill()
        stroke('#80000D')
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
    }
}
}
function gotResults(error, results){
if(error){
    console.log(error)
}
else{
    console.log(results)
    objects = results
}
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Objects are being Detected"
}
function modelLoaded(){
    console.log("Model(s) have(has) been loaded.")
    status = true
    video.loop()
    video.speed(1)
    video.volume(0)
}
function pause(){
    video.pause()
}
function stop(){
    video.stop()
}
