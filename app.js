function toggleImage() {
  var img = document.getElementById("myImage");
  if (img.style.display === "none") {
    img.style.display = "block"; // Unhide
  } else {
    img.style.display = "none"; // Hide
  }
}
function NEXT() {
    const starterSection = document.getElementById('starter-pick');
    starterSection.style.display = 'flex';
}