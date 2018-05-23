void setup(){
  selectInput("Select a file to process:", "fileSelected");
  size(800, 600);
}
void draw(){
  fill(0);
  background(255);
  textSize(32);
  text("Hello World!", 0, 100);
}

void fileSelected(File selection) {
  if (selection == null) {
    println("Window was closed or the user hit cancel.");
  } else {
    println("User selected " + selection.getAbsolutePath());
  }
}
