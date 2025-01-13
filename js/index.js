const apiKey = 'AIzaSyD-tFNX5zTtPggLzrEB5dXENkNUcvnqmtU';
const query = 'calculus';
const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;
// another api key AIzaSyBk_VgvKLnFSCVK7xxHOGr-J8KvhJ_MA8w
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const videoId = data.items[0].id.videoId; 
        const iframe = document.getElementById('calculusVideo');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
    })
    .catch(error => console.error('Error fetching YouTube API:', error));