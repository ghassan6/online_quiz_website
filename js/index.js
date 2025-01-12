const apiKey = 'AIzaSyBSeumWG2wRbg0YKkT64x43axyHGvJBSqk'; // ضع مفتاح API هنا
const query = 'calculus';
// const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;
let ID = "UukVP7Mg3TU";


// Fetch video details from the YouTube Data API
fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ID}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {


    // Set the YouTube video in the iframe
    const iframe = document.getElementById('youtube-player');
    iframe.src = `https://www.youtube.com/embed/${ID}`;
  })
  .catch(error => {
    console.error('Error fetching video details:', error);
  });
