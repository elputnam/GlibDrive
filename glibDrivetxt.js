function glibDriveText(){
    if (frameCount%19==0 ){
    textSize(55);
    noStroke();
    fill(200);
    textFont('VT323');
    voice.speak(txt1[j]);
    text(txt2[j], width*.05, height*.8);
    j += 1;
    }
}